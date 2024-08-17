export interface IData {
    email: string;
    subject: string;
	text: string;
    greetings: string;
}

export interface IEmailState {
	status: 'idle' | 'success' | 'loading' | 'failed';
	error: string | undefined;
    email: string;
}