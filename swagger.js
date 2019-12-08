const getMoviePart = require('./swagger-movie');

const error = {
	description: 'Message with error'
	// example: { message: 'Something went wrong' }
};

const getByIdParams = (description = 'id') => ({
	in: 'path',
	name: 'id',
	required: true,
	description,
	schema: { type: 'string' }
});

const commonRoutes = {
	'/auth/login': {
		post: {
			tags: ['Auth'],
			summary: 'Login',
			parameters: [
				{
					in: 'body',
					name: 'body',
					required: true,
					schema: {
						type: 'object',
						example: {
							email: 'lol@lol.com',
							password: 'qwerty'
						},
						required: ['email', 'password']
					}
				}
			],
			responses: {
				200: {
					description: 'Login success',
					example: {
						user: 'user object',
						token: 'some token'
					}
				},
				401: error
			}
		}
	},
	'/auth/register': {
		post: {
			tags: ['Auth'],
			summary: 'Register new user',
			parameters: [
				{
					in: 'body',
					name: 'body',
					required: true,
					schema: {
						type: 'object',
						example: {
							email: 'someEmail@gmail.com',
							firstName: 'Tony',
							lastName: 'Montana',
							password: 'qwerty',
							confirmPassword: 'qwerty'
						},
						required: ['email', 'firstName', 'lastName', 'password', 'confirmPassword']
					}
				}
			],
			responses: {
				200: {
					description: 'User registered successfully',
					example: {
						message: 'String',
						id: 'String'
					}
				},
				401: error,
				400: error
			}
		}
	},
	'/auth/logout': {
		get: {
			tags: ['Auth'],
			summary: 'Log Out',
			parameters: [],
			responses: {
				200: { description: 'Log out successfully' },
				401: error,
				404: error
			}
		}
	},
	'/users': {
		get: {
			tags: ['Users'],
			security: [{ bearerAuth: [] }],
			summary: 'Get list of users (admin only)',
			parameters: [],
			responses: {
				200: {
					description: 'List of users received successfully',
					example: {
						users: 'Array'
					}
				},
				401: error,
				404: error
			}
		}
	},
	'/users/{id}': {
		get: {
			tags: ['Users'],
			security: [{ bearerAuth: [] }],
			summary: 'Get user by id',
			parameters: [getByIdParams('User id')],
			responses: {
				200: {
					description: 'User received successfully',
					example: {
						user: {
							local: {
								firstName: 'String',
								lastName: 'String',
								email: 'String',
								profilePhoto: 'String'
							},
							role: 'Number',
							_id: 'String',
							method: 'String',
							createdAt: 'String',
							updatedAt: 'String'
						}
					}
				},
				401: error,
				404: error
			}
		},
		put: {
			tags: ['Users'],
			security: [{ bearerAuth: [] }],
			summary: 'Update user by id (admin only)',
			description:
				'You should pass fields what you want to change, if you want to change password, confirmPassword is required admin can change data only for user with metod "local"',
			parameters: [
				getByIdParams('User id'),
				{
					in: 'body',
					name: 'body',
					required: true,
					schema: {
						type: 'object',
						example: {
							profilePhoto: 'any string with url',
							firstName: 'Tony',
							lastName: 'Montana',
							password: 'qwerty',
							confirmPassword: 'qwerty',
							language: 'ru'
						}
					}
				}
			],
			responses: {
				200: { description: 'All changes saved successfully' },
				401: error,
				404: error
			}
		},
		delete: {
			tags: ['Users'],
			security: [{ bearerAuth: [] }],
			summary: 'Delete user by id (admin only)',
			description: "User can't delete himself",
			parameters: [getByIdParams('User id')],
			responses: {
				200: { description: 'Category deleted successfully' },
				401: error,
				404: error
			}
		}
	},
	'/users/changeRole': {
		put: {
			tags: ['Users'],
			security: [{ bearerAuth: [] }],
			summary: 'Change user role  (admin only)',
			description: 'roles in the system: 1-admin, 0-user, admin can change role for any user',
			parameters: [
				{
					in: 'body',
					name: 'body',
					required: true,
					schema: {
						type: 'object',
						example: {
							userid: 'any existing user id',
							role: '0'
						},
						required: ['userid', 'role']
					}
				}
			],
			responses: {
				200: { description: 'User role changed successfully' },
				401: error,
				404: error
			}
		}
	},
	'/documents': {
		post: {
			tags: ['Documents'],
			security: [{ bearerAuth: [] }],
			summary: 'Upload image',
			description: 'You must upload photos no more than 200x200',
			parameters: [
				{
					in: 'formData',
					name: 'file',
					required: true,
					type: 'file'
				}
			],
			responses: {
				200: {
					description: 'get base64 success',
					example: { link: 'base64 string' }
				},
				401: error
			}
		}
	}
};

const swaggerDocument = {
	swagger: '2.0',
	info: {
		version: '1.0',
		title: 'Test API',
		description: 'Test API documentation & Movie API documentation',
		contact: {}
	},
	securityDefinitions: {
		bearerAuth: {
			type: 'apiKey',
			name: 'Authorization',
			description: 'You must enter the "Bearer" word + JWT token !!!',
			in: 'header'
		}
	},
	host: process.env.NODE_ENV === 'production' ? process.env.BASE_URL_REMOUTE : 'localhost:5000/api',
	schemes: ['http'],
	consumes: ['application/json'],
	produces: ['application/json'],
	paths: {
		...commonRoutes,
		...getMoviePart(getByIdParams, error)
	}
};

module.exports = swaggerDocument;
