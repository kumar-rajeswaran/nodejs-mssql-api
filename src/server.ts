import { App } from "./app";
import { UserRoute, AuthRoute } from "./routes";

const app = new App([new AuthRoute(), new UserRoute()]);

app.listen();
