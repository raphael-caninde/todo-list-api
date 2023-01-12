import { App } from './app';

const PORT = process.env.PORT as string;

new App().start(PORT);
