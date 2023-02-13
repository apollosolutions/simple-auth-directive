/**
 * Our resolvers don't need to be aware of the standardized auth logic.
 * If we wanted we could parse the values out of the context, but that is not needed for a demo.
 */
export const resolvers = {
    Query: {
        noAuth: () => 'hello from noAuth',
        auth: () => 'hello from auth',
        authDefault: () => 'hello from authDefault',
        authUser: () => 'hello from authUser',
        authPartner: () => 'hello from authPartner',
        authAdmin: () => 'hello from authAdmin',
    }
};
