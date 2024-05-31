// Import h3 as npm dependency
import { H3Event, createApp, createRouter, defineEventHandler, createError, useSession } from "h3";

// Create an app instance
export const app = createApp();

// Create a new router and register it in app
const router = createRouter();
app.use(router);

router.get('/logged-in/*/*', defineEventHandler(async (event) => {
    const params = event.context.params

    const session = await useSession(event, {
        name: "my-session",
        password: "80d42cfb-1cd2-462c-8f17-e3237d9027e9",
        cookie: {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        },
        maxAge: 60 * 60 * 24 * 7
    });
    if (!params || !params._0 || !params._1) {
        return createError({
            status: 1004,
            statusMessage: 'Provided registeration session data should be: Username and email!'
        })
    }
    const username = session.data['username'] ?? params._0
    const email = session.data['email'] ?? params._1

    await session.update({
        username: username,
        email: email
    })
    return session;
}))

// // Add a new route that matches GET requests to / path
// router.get(
//     "/",
//     defineEventHandler((event) => {
//         return { message: "⚡️ Tadaa!" };
//     }),
// );

// app.use('/api', defineEventHandler(async (event) => "<h1>Hello world!</h1>"));

// app.use(
//     defineEventHandler((event) => {
//         console.log("Middleware 1");
//     }),
// );
// app.use(
//     defineEventHandler((event) => {
//         console.log("Middleware 2");
//         if (event.__is_event__)
//             return createError({
//                 message: `Message: Error in middleware 2 due to event.__is_event__ is ${event.__is_event__}`,
//                 data: `Data: Error in middleware 2 due to event.__is_event__ is ${event.__is_event__}`,
//                 status: 700,
//                 name: "Middleware 2",
//                 statusMessage: 'statusMessage'
//             })

//     }),
// );
// app.use(
//     defineEventHandler((event) => {
//         return "Response";
//     }),
// );

// router.get(
//     "/hello/*/*/*/*",
//     defineEventHandler((event: H3Event) => {
//         const params = event.context.params;

//         if (params) {
//             const valuesStartingWithUnderscore = Object.keys(params)
//                 .filter(key => key.startsWith('_'))
//                 .map(key => params[key]); // Map the keys to their corresponding values

//             console.log(valuesStartingWithUnderscore);
//             return { data: valuesStartingWithUnderscore };
//         }

//         console.log('No parameters found.');
//         return createError({
//             status: 1000,
//             statusMessage: 'URL has no params requested!',
//         });
//     }),
// );

// npx --yes listhen -w .\h3-app.ts --host