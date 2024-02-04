import {Inject, OnInit, Req, Res, Service} from '@tsed/common';
import {MongooseModel} from '@tsed/mongoose';
import {$log} from '@tsed/logger';
import {User} from '../models/User';
import jwt from 'jsonwebtoken';
import {comparePassword, cryptPassword} from '../utils/password-enc-dec';
import sgMail from '@sendgrid/mail';
import otpGenerator from 'otp-generator';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

@Service()
export class UserService {
	@Inject(User)
	private User: MongooseModel<User>;

	async find(
		filter?: any,
		take?: string,
		skip?: string,
		sortBy?: string,
		currentUser?: User
	): Promise<User[] | null> {
		let data = filter
			? await this.User.find(JSON.parse(filter))
					.limit(take ? parseInt(take) : 100)
					.skip(skip ? parseInt(skip) : 0)
					.sort(sortBy ? sortBy : undefined)
					.select('-email')
					.ne('_id', currentUser?._id)
			: await this.User.find().select('-email').ne('_id', currentUser?._id);
		return data;
	}

	async findById(id: string) {
		return await this.User.findById(id).lean().select('-email');
	}

	async findOne(filter: any) {
		return await this.User.findOne(filter).select('-email');
	}

	async create(user: User, res: Res) {
		try {
			const passwordEncrypted = await cryptPassword(user.password);

			let userCreated = await this.User.create({
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				password: passwordEncrypted,
				profileImage: `${process.env.PRODUCTION_URL}/profile/default.png`,
			});
			userCreated.password = '';
			return res.status(201).json({success: true, data: userCreated});
		} catch (error) {
			if (error.name === 'ValidationError') {
				return {status: 400, data: null, message: error.message};
			} else if (error.name === 'MongoError' && error.code === 11000) {
				return {status: 409, data: null, message: error.message};
			} else {
				return {status: 500, data: null, message: error.message};
			}
		}
	}

	async login(body: any, res: Res) {
		if (!body.email || !body.password) {
			return res.status(400).send({message: 'Bad Request'});
		}

		let user = await this.User.findOne({email: body.email}).select('+password');

		if (!user) {
			return res.status(404).send({message: 'User not found'});
		}
		let valid;
		try {
			valid = await comparePassword(body.password, user.password);
		} catch (err) {
			valid = false;
			return res.status(500).send({message: 'An unexpected error occured'});
		}

		if (!valid) {
			return res.status(401).send({message: 'Incorrect credentials'});
		}

		const token = jwt.sign(
			{sub: user._id.toString()},
			String(process.env.SECRET),
			{
				expiresIn: '365d',
			}
		);
		user.lastLogin = new Date();
		await user.save();

		user = user.toObject();
		let userToReturn = {...user, token: token};
		userToReturn.password = '';
		return res.status(200).send(userToReturn);
	}

	async update(user: User, res: Res, body: any) {
		try {
			let userToUpdate = await this.User.findById(user._id);
			if (!userToUpdate) {
				return res.status(404).json({success: false, err: 'user not found'});
			}
			user.firstName = body.firstName ? body.firstName : user.firstName;
			user.lastName = body.lastName ? body.lastName : user.lastName;
			userToUpdate.save();

			return res.status(200).json({success: true, data: user});
		} catch (err) {
			return res
				.status(500)
				.json({success: false, err: 'An unexpected error occured'});
		}
	}

	async delete(userReq: User, res: Res): Promise<User | any> {
		try {
			let user = await this.User.findById(userReq._id);

			if (!user) {
				return res.status(404).json({success: false, err: 'Not Found'});
			}

			const response = await this.User.deleteOne({_id: user.id});
			return res.status(200).json({success: true, data: response});
		} catch (err) {
			return res
				.status(500)
				.json({success: false, err: 'An unexpected error occured'});
		}
	}

	async forgetPasswordSendMail(req: Req, res: Res, body: any) {
		try {
			if (!body.email) {
				return res.status(500).send({message: 'Email is required'});
			}
			let user = await this.User.findOne({email: body.email}).select(
				'+emailOTP'
			);

			if (!user) {
				return res.status(500).send({message: 'User not found'});
			}

			let otp = otpGenerator
				.generate(8, {upperCaseAlphabets: false, specialChars: false})
				.toUpperCase();

			user.emailOTP = otp;
			user.save();

			const mailgun = new Mailgun(formData);
			const client = mailgun.client({
				username: 'api',
				key: String(process.env.MAIL_GUN),
			});

			const messageData = {
				from: String(process.env.EMAIL),
				to: body.email,
				subject: 'EMAIL OTP',
				html: `<!DOCTYPE html>

        <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
        <head>
        <title></title>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
        <meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
        <style>
            * {
              box-sizing: border-box;
            }
        
            body {
              margin: 0;
              padding: 0;
            }
        
            a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: inherit !important;
            }
        
            #MessageViewBody a {
              color: inherit;
              text-decoration: none;
            }
        
            p {
              line-height: inherit
            }
        
            .desktop_hide,
            .desktop_hide table {
              mso-hide: all;
              display: none;
              max-height: 0px;
              overflow: hidden;
            }
        
            .image_block img+div {
              display: none;
            }
        
            @media (max-width:520px) {
              .desktop_hide table.icons-inner {
                display: inline-block !important;
              }
        
              .icons-inner {
                text-align: center;
              }
        
              .icons-inner td {
                margin: 0 auto;
              }
        
              .row-content {
                width: 100% !important;
              }
        
              .mobile_hide {
                display: none;
              }
        
              .stack .column {
                width: 100%;
                display: block;
              }
        
              .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
              }
        
              .desktop_hide,
              .desktop_hide table {
                display: table !important;
                max-height: none !important;
              }
        
              .row-1 .column-1 .block-6.paragraph_block td.pad>div {
                font-size: 23px !important;
              }
        
              .row-1 .column-1 .block-4.heading_block h1 {
                font-size: 17px !important;
              }
        
              .row-2 .column-1 .block-1.button_block a span,
              .row-2 .column-1 .block-1.button_block div,
              .row-2 .column-1 .block-1.button_block div span,
              .row-2 .column-2 .block-1.button_block a span,
              .row-2 .column-2 .block-1.button_block div,
              .row-2 .column-2 .block-1.button_block div span,
              .row-2 .column-3 .block-1.button_block a span,
              .row-2 .column-3 .block-1.button_block div,
              .row-2 .column-3 .block-1.button_block div span {
                font-size: 12px !important;
                line-height: 1.5 !important;
              }
        
              .row-2 .column-1 {
                padding: 5px !important;
              }
            }
          </style>
        </head>
        <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <div class="spacer_block block-1" style="height:60px;line-height:60px;font-size:1px;"> </div>
        <table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
        <div align="center" class="alignment" style="line-height:10px"><img src="https://app.acquire.fi/static/image/icons/email.png" style="display: block; height: auto; border: 0; width: 100px; max-width: 100%;" width="100"/></div>
        </td>
        </tr>
        </table>
        <div class="spacer_block block-3" style="height:20px;line-height:20px;font-size:1px;"> </div>
        <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="text-align:center;width:100%;">
        <h1 style="margin: 0; color: #555555; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 19px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;">Your Verification Code:<br/></h1>
        </td>
        </tr>
        </table>
        <div class="spacer_block block-5" style="height:20px;line-height:20px;font-size:1px;"> </div>
        <table border="0" cellpadding="10" cellspacing="0" class="paragraph_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
        <tr>
        <td class="pad">
        <div style="color:#909090;direction:ltr;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;font-size:25px;font-weight:400;letter-spacing:3px;line-height:120%;text-align:center;mso-line-height-alt:30px;">
        <p style="margin: 0;">${otp.toUpperCase()}</p>
        </div>
        </td>
        </tr>
        </table>
        <div class="spacer_block block-7" style="height:20px;line-height:20px;font-size:1px;"> </div>
        <table border="0" cellpadding="10" cellspacing="0" class="heading_block block-8" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad">
        <h1 style="margin: 0; color: #696969; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 14px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;">Your verification code will expire in 10 minutes</h1>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="10" cellspacing="0" class="divider_block block-9" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad">
        <div align="center" class="alignment">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
        </tr>
        </table>
        </div>
        </td>
        </tr>
        </table>
        <div class="spacer_block block-10" style="height:20px;line-height:20px;font-size:1px;"> </div>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 500px;" width="500">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="33.333333333333336%">
        <table border="0" cellpadding="0" cellspacing="0" class="button_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="text-align:center;">
        <div align="center" class="alignment"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://en.wikipedia.org/wiki/Home_page" style="height:31px;width:77px;v-text-anchor:middle;" arcsize="13%" stroke="false" fill="false"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#909090; font-family:Arial, sans-serif; font-size:14px"><![endif]--><a href="https://en.wikipedia.org/wiki/Home_page" style="text-decoration:none;display:inline-block;color:#909090;background-color:transparent;border-radius:4px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:20px;padding-right:20px;font-size:14px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="word-break: break-word; line-height: 21px;"><u>Home</u></span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
        </td>
        </tr>
        </table>
        </td>
        <td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="33.333333333333336%">
        <table border="0" cellpadding="0" cellspacing="0" class="button_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="text-align:center;">
        <div align="center" class="alignment"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://dictionary.cambridge.org/dictionary/english/contribute" style="height:31px;width:104px;v-text-anchor:middle;" arcsize="13%" stroke="false" fill="false"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#909090; font-family:Arial, sans-serif; font-size:14px"><![endif]--><a href="www.policies.com" style="text-decoration:none;display:inline-block;color:#909090;background-color:transparent;border-radius:4px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:20px;padding-right:20px;font-size:14px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="word-break: break-word; line-height: 21px;"><u>Contribute</u></span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
        </td>
        </tr>
        </table>
        </td>
        <td class="column column-3" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="33.333333333333336%">
        <table border="0" cellpadding="0" cellspacing="0" class="button_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="text-align:center;">
        <div align="center" class="alignment"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.google.com/advanced_search" style="height:31px;width:84px;v-text-anchor:middle;" arcsize="13%" stroke="false" fill="false"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#909090; font-family:Arial, sans-serif; font-size:14px"><![endif]--><a href="www.terms.com" style="text-decoration:none;display:inline-block;color:#909090;background-color:transparent;border-radius:4px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank"><span style="padding-left:20px;padding-right:20px;font-size:14px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="word-break: break-word; line-height: 21px;"><u>Search</u></span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
        <table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="alignment" style="vertical-align: middle; text-align: center;"><!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
        <!--[if !vml]><!-->
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table><!-- End -->
        </body>
        </html> `,
			};

			await client.messages.create(String(process.env.DOMAIN), messageData);

			return res.status(200).send({message: 'Email sent succesfully'});
		} catch (err) {
			return res.status(500).send({message: 'An unexpected error occured'});
		}
	}

	async resetPassword(req: Req, res: Res, body: any) {
		try {
			if (!body.otp || !body.newPassword) {
				return res.status(400).send({message: 'Bad Request'});
			}

			let user = await this.User.findOne({
				emailOTP: body.otp.toUpperCase(),
			}).select('+emailOTP');

			if (!user) {
				return res.status(404).send({message: 'User not found'});
			}

			if (body.otp == user.emailOTP) {
				const passwordEncrypted = await cryptPassword(body.newPassword);
				user.password = passwordEncrypted;
				user.emailOTP = '';
				await user.save();
				return res.status(200).send({message: 'New password has been set'});
			} else {
				return res.status(401).send({
					message: 'Incorrect Otp Unable to change password',
				});
			}
		} catch (err) {
			return res.status(500).send({message: 'An unexpected error occured'});
		}
	}

	async updateOnline(id: string) {
		const user = await this.User.findById(id);
		if (!user) {
			return;
		}

		user.lastLogin = new Date();
		user.isOnline = true;
		user.save();

		return;
	}
}
