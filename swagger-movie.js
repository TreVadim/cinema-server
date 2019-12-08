const queryParams = name => ({
	in: 'query',
	name,
	schema: { type: 'string' }
});

const getMoviePart = (getByIdParams, error) => ({
	'/movie': {
		get: {
			tags: ['Movie (movie api)'],
			summary: 'Get list of movie with query params',
			description: 'You can pass any parametr for search',
			parameters: [
				queryParams('title'),
				queryParams('description'),
				queryParams('age'),
				queryParams('language'),
				queryParams('actors'),
				queryParams('country'),
				queryParams('genre'),
				queryParams('_id')
			],
			responses: {
				200: {
					description: 'List of movies received successfully',
					example: { movie: 'Array' }
				},
				401: error,
				404: error
			}
		},
		post: {
			tags: ['Movie (movie api)'],
			security: [{ bearerAuth: [] }],
			summary: 'Create Movie (admin only)',
			parameters: [
				{
					in: 'body',
					name: 'body',
					required: true,
					schema: {
						type: 'object',
						example: {
							title: 'New Movie',
							description: 'New movie description',
							age: '17',
							trailer: 'some string with link on trailer',
							language: 'en',
							long: '1.5',
							genre: ['drama', 'horrors'],
							country: ['USA'],
							actors: ['Actor 1', 'Actor 2'],
							poster: 'some string with link on img',
							rentStart: 'valid Date format = "2019-05-23T18:45:36"',
							rentEnd: 'valid Date format = "2019-05-23T18:45:36"'
						},
						required: ['title', 'description', 'trailer', 'long', 'rentStart', 'rentEnd']
					}
				}
			],
			responses: {
				200: {
					description: 'Movie created successfully',
					example: {
						genre: [],
						country: [],
						actors: [],
						actorsWiki: [],
						_id: '5d0f3b2921d6266aa587c443',
						title: 'New Movie',
						description: 'New movie description',
						trailer: 'some string with link on trailer',
						long: 2,
						rentStart: '2019-06-23T08:39:05.621Z',
						rentEnd: '2019-06-23T08:39:05.621Z',
						createdAt: '2019-06-23T08:41:13.277Z',
						updatedAt: '2019-06-23T08:41:13.277Z',
						__v: 0
					}
				},
				401: error,
				404: error
			}
		}
	},
	'/movie/{id}': {
		put: {
			tags: ['Movie (movie api)'],
			security: [{ bearerAuth: [] }],
			summary: 'Update movie by id (admin only)',
			description: 'You should pass fields what you want to change',
			parameters: [
				getByIdParams('Movie id'),
				{
					in: 'body',
					name: 'body',
					required: true,
					schema: {
						type: 'object',
						example: {
							title: 'New Movie',
							description: 'New movie description',
							age: '17',
							trailer: 'some string with link on trailer',
							language: 'en',
							long: '1.5',
							genre: ['drama', 'horrors'],
							country: ['USA'],
							actors: ['Actor 1', 'Actor 2'],
							poster: 'some string with link on img',
							rentStart: 'valid Date format = "2019-05-23T18:45:36"',
							rentEnd: 'valid Date format = "2019-05-23T18:45:36"'
						}
					}
				}
			],
			responses: {
				200: {
					description: 'Movie updated successfully',
					example: {
						genre: [],
						country: [],
						actors: [],
						actorsWiki: [],
						_id: '5d0f3b2921d6266aa587c443',
						title: 'New Movie',
						description: 'New movie description',
						trailer: 'some string with link on trailer',
						long: 2,
						rentStart: '2019-06-23T08:39:05.621Z',
						rentEnd: '2019-06-23T08:39:05.621Z',
						createdAt: '2019-06-23T08:41:13.277Z',
						updatedAt: '2019-06-23T08:41:13.277Z',
						__v: 0
					}
				},
				401: error,
				404: error
			}
		},
		delete: {
			tags: ['Movie (movie api)'],
			security: [{ bearerAuth: [] }],
			summary: 'Delete Movie by id (admin only)',
			parameters: [getByIdParams('Category id')],
			responses: {
				200: { description: 'Movie deleted successfully' },
				401: error,
				404: error
			}
		}
	},
	'/movie/room': {
		get: {
			tags: ['Rooms (movie api)'],
			summary: 'Get list of rooms',
			responses: {
				200: {
					description: 'List of rooms received successfully',
					example: { rooms: 'Array' }
				},
				401: error,
				404: error
			}
		},
		post: {
			tags: ['Rooms (movie api)'],
			security: [{ bearerAuth: [] }],
			summary: 'Create Room (admin only)',
			parameters: [
				{
					in: 'body',
					name: 'body',
					required: true,
					schema: {
						type: 'object',
						example: { name: 'Green' },
						required: ['name']
					}
				}
			],
			responses: {
				200: {
					description: 'Room created successfully',
					example: {
						_id: '5d0f3b2921d6266aa587c443',
						name: 'Green',
						createdAt: '2019-06-23T08:41:13.277Z',
						updatedAt: '2019-06-23T08:41:13.277Z',
						__v: 0
					}
				},
				401: error,
				404: error
			}
		}
	},
	'/movie/room/{id}': {
		put: {
			tags: ['Rooms (movie api)'],
			security: [{ bearerAuth: [] }],
			summary: 'Update room by id (admin only)',
			description: 'You should pass fields what you want to change',
			parameters: [
				getByIdParams('Room id'),
				{
					in: 'body',
					name: 'body',
					required: true,
					schema: {
						type: 'object',
						example: { name: 'New room' }
					}
				}
			],
			responses: {
				200: {
					description: 'Room updated successfully',
					example: {
						_id: '5d0f3b2921d6266aa587c443',
						name: 'New room',
						createdAt: '2019-06-23T08:41:13.277Z',
						updatedAt: '2019-06-23T08:41:13.277Z',
						__v: 0
					}
				},
				401: error,
				404: error
			}
		},
		delete: {
			tags: ['Rooms (movie api)'],
			security: [{ bearerAuth: [] }],
			summary: 'Delete room by id (admin only)',
			parameters: [getByIdParams('Room id')],
			responses: {
				200: { description: 'Room deleted successfully' },
				401: error,
				404: error
			}
		}
	},
	'/movie/session': {
		get: {
			tags: ['Session (movie api)'],
			summary: 'Get list of session with query params',
			description:
				'If you pass query params, API return result of sort, if you not pass any query params API return all list',
			parameters: [
				queryParams('date'),
				queryParams('costs'),
				queryParams('room'),
				queryParams('movie'),
				queryParams('_id')
			],
			responses: {
				200: {
					description: 'List of session received successfully',
					example: { session: 'Array' }
				},
				401: error,
				404: error
			}
		},
		post: {
			tags: ['Session (movie api)'],
			security: [{ bearerAuth: [] }],
			summary: 'Create Session (admin only)',
			parameters: [
				{
					in: 'body',
					name: 'body',
					required: true,
					schema: {
						type: 'object',
						example: {
							date: 'valid Date format = "2019-05-23T18:45:36"',
							costs: '150',
							room: 'any existing room id',
							movie: 'anu existing movie id'
						},
						required: ['date', 'costs', 'room', 'movie']
					}
				}
			],
			responses: {
				200: {
					description: 'Session created successfully',
					example: {
						_id: '5c93db6b7a0168f19acd9296',
						costs: 300,
						createdAt: '2019-03-21T18:43:55.701Z',
						date: '2019-05-23T15:45:36.000Z',
						movie: '5c8b98da134679a06f9b2cdd',
						room: '5c93d7a17a0168f19acd91ca',
						updatedAt: '2019-03-21T18:53:01.822Z'
					}
				},
				401: error,
				404: error
			}
		}
	},
	'/movie/session/{id}': {
		put: {
			tags: ['Session (movie api)'],
			security: [{ bearerAuth: [] }],
			summary: 'Update sessoin by id (admin only)',
			description: 'You should pass fields what you want to change',
			parameters: [
				getByIdParams('Session id'),
				{
					in: 'body',
					name: 'body',
					required: true,
					schema: {
						type: 'object',
						example: {
							date: 'valid Date format = "2019-05-23T18:45:36"',
							costs: '150',
							room: 'any existing room id',
							movie: 'anu existing movie id'
						}
					}
				}
			],
			responses: {
				200: {
					description: 'Session updated successfully',
					example: {
						_id: '5c93db6b7a0168f19acd9296',
						costs: 150,
						createdAt: '2019-03-21T18:43:55.701Z',
						date: '2019-05-23T15:45:36.000Z',
						movie: '5c8b98da134679a06f9b2cdd',
						room: '5c93d7a17a0168f19acd91ca',
						updatedAt: '2019-03-21T18:53:01.822Z'
					}
				},
				401: error,
				404: error
			}
		},
		delete: {
			tags: ['Session (movie api)'],
			security: [{ bearerAuth: [] }],
			summary: 'Delete session by id (admin only)',
			parameters: [getByIdParams('Sessoin id')],
			responses: {
				200: { description: 'Session deleted successfully' },
				401: error,
				404: error
			}
		}
	},
	'/movie/space': {
		get: {
			tags: ['Space (movie api)'],
			summary: 'Get list of space with query params',
			description:
				'If you pass query params, API return result of sort, if you not pass any query params API return all list',
			parameters: [
				{
					in: 'query',
					name: 'room',
					description: 'Room id',
					schema: { type: 'string' }
				}
			],
			responses: {
				200: {
					description: 'List of space received successfully',
					example: { space: 'Array', count: 'Number' }
				},
				401: error,
				404: error
			}
		},
		post: {
			tags: ['Space (movie api)'],
			security: [{ bearerAuth: [] }],
			summary: 'Create Space (admin only)',
			description: 'Create one individual space',
			parameters: [
				{
					in: 'body',
					name: 'body',
					required: true,
					schema: {
						type: 'object',
						example: {
							row: 10,
							place: 10,
							room: 'any existing room id'
						},
						required: ['row', 'place', 'room']
					}
				}
			],
			responses: {
				200: {
					description: 'Space created successfully',
					example: {
						space: {
							_id: '5d0f4b4b43f5614d448cc02b',
							place: 10,
							room: '5c93d7a17a0168f19acd91ca',
							row: 10,
							__v: 0,
							createdAt: '2019-06-23T09:50:03.462Z',
							updatedAt: '2019-06-23T09:50:03.462Z'
						}
					}
				},
				401: error,
				404: error
			}
		}
	},
	'/movie/spacemult': {
		post: {
			tags: ['Space (movie api)'],
			security: [{ bearerAuth: [] }],
			summary: 'Create Space (admin only)',
			description:
				'key [row] = should be a number value [Array of places] = should be an arrey of numbers without duplicate',
			parameters: [
				{
					in: 'body',
					name: 'body',
					required: true,
					schema: {
						type: 'object',
						example: {
							space: {
								row: ['Array of places']
							},
							room: 'any existing room id'
						},
						required: ['space', 'room']
					}
				}
			],
			responses: {
				200: { description: 'Space created successfully' },
				401: error,
				404: error
			}
		}
	},
	'/movie/space/{id}': {
		put: {
			tags: ['Space (movie api)'],
			security: [{ bearerAuth: [] }],
			summary: 'You must work with shadow space here',
			description: 'You can change only "free" option',
			parameters: [
				getByIdParams('Space id'),
				{
					in: 'body',
					name: 'body',
					required: true,
					schema: {
						type: 'object',
						example: { free: true }
					}
				}
			],
			responses: {
				200: {
					description: 'Shadow space updated successfully',
					example: {
						free: true,
						booked: false,
						_id: '5cb6f02cc765e196f6adcb97',
						user: '5c7d1c14dc47620ebd72821a',
						space: '5cb1de6fc4493e90276ad26a',
						session: '5cb6f02cc765e196f6adcb96',
						row: 1,
						place: 1,
						createdAt: '2019-04-17T09:21:48.774Z',
						updatedAt: '2019-06-23T10:05:32.703Z',
						__v: 0
					}
				},
				401: error,
				404: error
			}
		},
		delete: {
			tags: ['Space (movie api)'],
			security: [{ bearerAuth: [] }],
			summary: 'Delete space (not shadow) by id (admin only)',
			parameters: [getByIdParams('Space id')],
			responses: {
				200: { description: 'Space deleted successfully' },
				401: error,
				404: error
			}
		}
	},
	'/movie/space-booked/{id}': {
		put: {
			tags: ['Space (movie api)'],
			security: [{ bearerAuth: [] }],
			summary: 'You must work with shadow space here',
			description: 'You can change only "booked" option',
			parameters: [
				getByIdParams('Space id'),
				{
					in: 'body',
					name: 'body',
					required: true,
					schema: {
						type: 'object',
						example: { booked: true }
					}
				}
			],
			responses: {
				200: {
					description: 'Shadow space updated successfully',
					example: {
						free: true,
						booked: false,
						_id: '5cb6f02cc765e196f6adcb97',
						user: '5c7d1c14dc47620ebd72821a',
						space: '5cb1de6fc4493e90276ad26a',
						session: '5cb6f02cc765e196f6adcb96',
						row: 1,
						place: 1,
						createdAt: '2019-04-17T09:21:48.774Z',
						updatedAt: '2019-06-23T10:05:32.703Z',
						__v: 0
					}
				},
				401: error,
				404: error
			}
		}
	},
	'/movie/space-shadow': {
		get: {
			tags: ['Space (movie api)'],
			summary: 'Get list of shadow space with query params',
			description:
				'If you pass query params, API return result of sort, if you not pass any query params API return all list',
			parameters: [
				{
					in: 'query',
					name: 'session',
					description: 'Session id',
					schema: { type: 'string' }
				}
			],
			responses: {
				200: {
					description: 'List of shadow space received successfully',
					example: { space: 'Array', count: 'Number' }
				},
				401: error,
				404: error
			}
		}
	},
	'/movie/tiket': {
		get: {
			tags: ['Tikets (movie api)'],
			summary: 'Get all tikets for current user',
			security: [{ bearerAuth: [] }],
			responses: {
				200: {
					description: 'List of tikets received successfully',
					example: { tiket: 'Array' }
				},
				401: error,
				404: error
			}
		},
		post: {
			tags: ['Tikets (movie api)'],
			security: [{ bearerAuth: [] }],
			summary: 'Create Tiket',
			parameters: [
				{
					in: 'body',
					name: 'body',
					required: true,
					schema: {
						type: 'object',
						example: {
							session: 'any existing session id',
							room: 'any existing room id',
							movie: 'any existing movie id'
						},
						required: ['session', 'room', 'movie']
					}
				}
			],
			responses: {
				200: {
					description: 'Tiket created successfully',
					example: {
						_id: '5d0f517d3b03626c735b4c4a',
						room: '5c93d7a17a0168f19acd91ca',
						movie: '5c8b98be134679a06f9b2cdc',
						user: '5c7d1c14dc47620ebd72821a',
						createdAt: '2019-06-23T10:16:29.549Z',
						updatedAt: '2019-06-23T10:16:29.549Z',
						__v: 0
					}
				},
				401: error,
				404: error
			}
		}
	}
});

module.exports = getMoviePart;
