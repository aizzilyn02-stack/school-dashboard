import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ClassroomController::index
 * @see app/Http/Controllers/ClassroomController.php:10
 * @route '/classrooms'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/classrooms',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ClassroomController::index
 * @see app/Http/Controllers/ClassroomController.php:10
 * @route '/classrooms'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClassroomController::index
 * @see app/Http/Controllers/ClassroomController.php:10
 * @route '/classrooms'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ClassroomController::index
 * @see app/Http/Controllers/ClassroomController.php:10
 * @route '/classrooms'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ClassroomController::index
 * @see app/Http/Controllers/ClassroomController.php:10
 * @route '/classrooms'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ClassroomController::index
 * @see app/Http/Controllers/ClassroomController.php:10
 * @route '/classrooms'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ClassroomController::index
 * @see app/Http/Controllers/ClassroomController.php:10
 * @route '/classrooms'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\ClassroomController::store
 * @see app/Http/Controllers/ClassroomController.php:20
 * @route '/classrooms'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/classrooms',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ClassroomController::store
 * @see app/Http/Controllers/ClassroomController.php:20
 * @route '/classrooms'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClassroomController::store
 * @see app/Http/Controllers/ClassroomController.php:20
 * @route '/classrooms'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ClassroomController::store
 * @see app/Http/Controllers/ClassroomController.php:20
 * @route '/classrooms'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ClassroomController::store
 * @see app/Http/Controllers/ClassroomController.php:20
 * @route '/classrooms'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ClassroomController::show
 * @see app/Http/Controllers/ClassroomController.php:34
 * @route '/classrooms/{classroom}'
 */
export const show = (args: { classroom: number | { id: number } } | [classroom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/classrooms/{classroom}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ClassroomController::show
 * @see app/Http/Controllers/ClassroomController.php:34
 * @route '/classrooms/{classroom}'
 */
show.url = (args: { classroom: number | { id: number } } | [classroom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { classroom: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { classroom: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    classroom: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        classroom: typeof args.classroom === 'object'
                ? args.classroom.id
                : args.classroom,
                }

    return show.definition.url
            .replace('{classroom}', parsedArgs.classroom.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClassroomController::show
 * @see app/Http/Controllers/ClassroomController.php:34
 * @route '/classrooms/{classroom}'
 */
show.get = (args: { classroom: number | { id: number } } | [classroom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ClassroomController::show
 * @see app/Http/Controllers/ClassroomController.php:34
 * @route '/classrooms/{classroom}'
 */
show.head = (args: { classroom: number | { id: number } } | [classroom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ClassroomController::show
 * @see app/Http/Controllers/ClassroomController.php:34
 * @route '/classrooms/{classroom}'
 */
    const showForm = (args: { classroom: number | { id: number } } | [classroom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ClassroomController::show
 * @see app/Http/Controllers/ClassroomController.php:34
 * @route '/classrooms/{classroom}'
 */
        showForm.get = (args: { classroom: number | { id: number } } | [classroom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ClassroomController::show
 * @see app/Http/Controllers/ClassroomController.php:34
 * @route '/classrooms/{classroom}'
 */
        showForm.head = (args: { classroom: number | { id: number } } | [classroom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\ClassroomController::update
 * @see app/Http/Controllers/ClassroomController.php:44
 * @route '/classrooms/{classroom}'
 */
export const update = (args: { classroom: number | { id: number } } | [classroom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/classrooms/{classroom}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ClassroomController::update
 * @see app/Http/Controllers/ClassroomController.php:44
 * @route '/classrooms/{classroom}'
 */
update.url = (args: { classroom: number | { id: number } } | [classroom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { classroom: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { classroom: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    classroom: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        classroom: typeof args.classroom === 'object'
                ? args.classroom.id
                : args.classroom,
                }

    return update.definition.url
            .replace('{classroom}', parsedArgs.classroom.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClassroomController::update
 * @see app/Http/Controllers/ClassroomController.php:44
 * @route '/classrooms/{classroom}'
 */
update.put = (args: { classroom: number | { id: number } } | [classroom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\ClassroomController::update
 * @see app/Http/Controllers/ClassroomController.php:44
 * @route '/classrooms/{classroom}'
 */
update.patch = (args: { classroom: number | { id: number } } | [classroom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\ClassroomController::update
 * @see app/Http/Controllers/ClassroomController.php:44
 * @route '/classrooms/{classroom}'
 */
    const updateForm = (args: { classroom: number | { id: number } } | [classroom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ClassroomController::update
 * @see app/Http/Controllers/ClassroomController.php:44
 * @route '/classrooms/{classroom}'
 */
        updateForm.put = (args: { classroom: number | { id: number } } | [classroom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\ClassroomController::update
 * @see app/Http/Controllers/ClassroomController.php:44
 * @route '/classrooms/{classroom}'
 */
        updateForm.patch = (args: { classroom: number | { id: number } } | [classroom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\ClassroomController::destroy
 * @see app/Http/Controllers/ClassroomController.php:60
 * @route '/classrooms/{classroom}'
 */
export const destroy = (args: { classroom: number | { id: number } } | [classroom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/classrooms/{classroom}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ClassroomController::destroy
 * @see app/Http/Controllers/ClassroomController.php:60
 * @route '/classrooms/{classroom}'
 */
destroy.url = (args: { classroom: number | { id: number } } | [classroom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { classroom: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { classroom: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    classroom: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        classroom: typeof args.classroom === 'object'
                ? args.classroom.id
                : args.classroom,
                }

    return destroy.definition.url
            .replace('{classroom}', parsedArgs.classroom.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ClassroomController::destroy
 * @see app/Http/Controllers/ClassroomController.php:60
 * @route '/classrooms/{classroom}'
 */
destroy.delete = (args: { classroom: number | { id: number } } | [classroom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ClassroomController::destroy
 * @see app/Http/Controllers/ClassroomController.php:60
 * @route '/classrooms/{classroom}'
 */
    const destroyForm = (args: { classroom: number | { id: number } } | [classroom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ClassroomController::destroy
 * @see app/Http/Controllers/ClassroomController.php:60
 * @route '/classrooms/{classroom}'
 */
        destroyForm.delete = (args: { classroom: number | { id: number } } | [classroom: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ClassroomController = { index, store, show, update, destroy }

export default ClassroomController