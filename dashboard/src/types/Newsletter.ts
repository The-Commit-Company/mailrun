export interface Newsletter {
    subject: string;
    sender_name: string;
    sender_email: string;
    message_html: string;
    email_sent: 0 | 1
}