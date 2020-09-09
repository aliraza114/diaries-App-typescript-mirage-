import { Server, Model, Factory, belongsTo, hasMany, Response } from 'miragejs'

export const handlerErros = (error: any, message = 'An Error Occurs') => {
    return new Response(400, undefined, {
        data: {
            message,
            isError: true
        }
    })
}

export const setupServer = (env?: string): Server => {
    return new Server({
        environment: env ?? 'development',

        models: {
            entry: Model.extend({
                diary: belongsTo()
            }),
            diary: Model.extend({
                entry: hasMany(),
                user: belongsTo()
            }),
            user: Model.extend({
                diary: hasMany()
            })
        },

        factories: {
            user: Factory.extend({
                username: 'aliraza',
                password: '12345678',
                email: 'aliraza@gmail.com'
            }) 
        },
        seeds: (server): any => {
            server.create('user')
        },

        routes(): void {
            this.urlPrefix = 'https://diaries.app'
        }
    })
}