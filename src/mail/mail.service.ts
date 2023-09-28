import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { User } from 'src/users/models/user.model';
import { Admin } from 'src/admin/models/admin.model';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService){}

    async sendUserConfirmation(user: User):Promise<void>{
        const url = `${process.env.API_HOST}/api/users/activate/${user.activation_link}`;
        console.log(url);
        await this.mailerService.sendMail({
        to:user.email,
        subject: `Welcome to Stadium app ?`,
        template: './confirmation.hbs',
        context: {
        name: user.first_name,
        url,
        }})}
        async sendAdminConfirmation(admin: Admin):Promise<void>{
            const url = `${process.env.API_HOST}/api/admins/activate/${admin.activation_link}`;
            console.log(url);
            await this.mailerService.sendMail({
            to:admin.email,
            subject: `Welcome to Stadium app ?`,
            template: './confirmation.hbs',
            context: {
            name: admin.username,
            url,
        }})}
}