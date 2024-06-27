import {
  FetchCreateContextFnOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";
import { appRouter } from "../trpc-router";

const handler = (request: Request) => {
  request.headers.append("Access-Control-Allow-Credentials", "true");
  request.headers.append(
    "Access-Control-Allow-Origin",
    "https://seoul-comix.vercel.app"
  );
  request.headers.append("Access-Control-Allow-Origin", "localhost:3000");
  request.headers.append(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  request.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  console.log(request.headers);


  return fetchRequestHandler({
    endpoint: "/apis/trpc",
    req: request,
    router: appRouter,
    createContext: function (
      opts: FetchCreateContextFnOptions
    ): object | Promise<object> {
      return {};
    },
  });
};


export { handler as GET, handler as POST };
