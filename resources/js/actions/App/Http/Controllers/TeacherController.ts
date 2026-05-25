import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TeacherController::index
 * @see app/Http/Controllers/TeacherController.php:10
 * @route '/teachers'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/teachers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TeacherController::index
 * @see app/Http/Controllers/TeacherController.php:10
 * @route '/teachers'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TeacherController::index
 * @see app/Http/Controllers/TeacherController.php:10
 * @route '/teachers'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TeacherController::index
 * @see app/Http/Controllers/TeacherController.php:10
 * @route '/teachers'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TeacherController::index
 * @see app/Http/Controllers/TeacherController.php:10
 * @route '/teachers'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TeacherController::index
 * @see app/Http/Controllers/TeacherController.php:10
 * @route '/teachers'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TeacherController::index
 * @see app/Http/Controllers/TeacherController.php:10
 * @route '/teachers'
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
* @see \App\Http\Controllers\TeacherController::store
 * @see app/Http/Controllers/TeacherController.php:20
 * @route '/teachers'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/teachers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TeacherController::store
 * @see app/Http/Controllers/TeacherController.php:20
 * @route '/teachers'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TeacherController::store
 * @see app/Http/Controllers/TeacherController.php:20
 * @route '/teachers'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TeacherController::store
 * @see app/Http/Controllers/TeacherController.php:20
 * @route '/teachers'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TeacherController::store
 * @see app/Http/Controllers/TeacherController.php:20
 * @route '/teachers'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\TeacherController::show
 * @see app/Http/Controllers/TeacherController.php:34
 * @route '/teachers/{teacher}'
 */
export const show = (args: { teacher: number | { id: number } } | [teacher: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/teachers/{teacher}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TeacherController::show
 * @see app/Http/Controllers/TeacherController.php:34
 * @route '/teachers/{teacher}'
 */
show.url = (args: { teacher: number | { id: number } } | [teacher: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { teacher: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { teacher: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    teacher: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        teacher: typeof args.teacher === 'object'
                ? args.teacher.id
                : args.teacher,
                }

    return show.definition.url
            .replace('{teacher}', parsedArgs.teacher.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TeacherController::show
 * @see app/Http/Controllers/TeacherController.php:34
 * @route '/teachers/{teacher}'
 */
show.get = (args: { teacher: number | { id: number } } | [teacher: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TeacherController::show
 * @see app/Http/Controllers/TeacherController.php:34
 * @route '/teachers/{teacher}'
 */
show.head = (args: { teacher: number | { id: number } } | [teacher: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TeacherController::show
 * @see app/Http/Controllers/TeacherController.php:34
 * @route '/teachers/{teacher}'
 */
    const showForm = (args: { teacher: number | { id: number } } | [teacher: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TeacherController::show
 * @see app/Http/Controllers/TeacherController.php:34
 * @route '/teachers/{teacher}'
 */
        showForm.get = (args: { teacher: number | { id: number } } | [teacher: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TeacherController::show
 * @see app/Http/Controllers/TeacherController.php:34
 * @route '/teachers/{teacher}'
 */
        showForm.head = (args: { teacher: number | { id: number } } | [teacher: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\TeacherController::update
 * @see app/Http/Controllers/TeacherController.php:44
 * @route '/teachers/{teacher}'
 */
export const update = (args: { teacher: number | { id: number } } | [teacher: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/teachers/{teacher}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\TeacherController::update
 * @see app/Http/Controllers/TeacherController.php:44
 * @route '/teachers/{teacher}'
 */
update.url = (args: { teacher: number | { id: number } } | [teacher: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { teacher: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { teacher: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    teacher: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        teacher: typeof args.teacher === 'object'
                ? args.teacher.id
                : args.teacher,
                }

    return update.definition.url
            .replace('{teacher}', parsedArgs.teacher.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TeacherController::update
 * @see app/Http/Controllers/TeacherController.php:44
 * @route '/teachers/{teacher}'
 */
update.put = (args: { teacher: number | { id: number } } | [teacher: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\TeacherController::update
 * @see app/Http/Controllers/TeacherController.php:44
 * @route '/teachers/{teacher}'
 */
update.patch = (args: { teacher: number | { id: number } } | [teacher: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\TeacherController::update
 * @see app/Http/Controllers/TeacherController.php:44
 * @route '/teachers/{teacher}'
 */
    const updateForm = (args: { teacher: number | { id: number } } | [teacher: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TeacherController::update
 * @see app/Http/Controllers/TeacherController.php:44
 * @route '/teachers/{teacher}'
 */
        updateForm.put = (args: { teacher: number | { id: number } } | [teacher: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\TeacherController::update
 * @see app/Http/Controllers/TeacherController.php:44
 * @route '/teachers/{teacher}'
 */
        updateForm.patch = (args: { teacher: number | { id: number } } | [teacher: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\TeacherController::destroy
 * @see app/Http/Controllers/TeacherController.php:60
 * @route '/teachers/{teacher}'
 */
export const destroy = (args: { teacher: number | { id: number } } | [teacher: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/teachers/{teacher}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TeacherController::destroy
 * @see app/Http/Controllers/TeacherController.php:60
 * @route '/teachers/{teacher}'
 */
destroy.url = (args: { teacher: number | { id: number } } | [teacher: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { teacher: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { teacher: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    teacher: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        teacher: typeof args.teacher === 'object'
                ? args.teacher.id
                : args.teacher,
                }

    return destroy.definition.url
            .replace('{teacher}', parsedArgs.teacher.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TeacherController::destroy
 * @see app/Http/Controllers/TeacherController.php:60
 * @route '/teachers/{teacher}'
 */
destroy.delete = (args: { teacher: number | { id: number } } | [teacher: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\TeacherController::destroy
 * @see app/Http/Controllers/TeacherController.php:60
 * @route '/teachers/{teacher}'
 */
    const destroyForm = (args: { teacher: number | { id: number } } | [teacher: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TeacherController::destroy
 * @see app/Http/Controllers/TeacherController.php:60
 * @route '/teachers/{teacher}'
 */
        destroyForm.delete = (args: { teacher: number | { id: number } } | [teacher: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const TeacherController = { index, store, show, update, destroy }

export default TeacherController