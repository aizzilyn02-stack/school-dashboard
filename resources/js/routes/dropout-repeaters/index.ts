import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\DropoutRepeaterController::index
 * @see app/Http/Controllers/DropoutRepeaterController.php:10
 * @route '/dropout-repeaters'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dropout-repeaters',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DropoutRepeaterController::index
 * @see app/Http/Controllers/DropoutRepeaterController.php:10
 * @route '/dropout-repeaters'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DropoutRepeaterController::index
 * @see app/Http/Controllers/DropoutRepeaterController.php:10
 * @route '/dropout-repeaters'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DropoutRepeaterController::index
 * @see app/Http/Controllers/DropoutRepeaterController.php:10
 * @route '/dropout-repeaters'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DropoutRepeaterController::index
 * @see app/Http/Controllers/DropoutRepeaterController.php:10
 * @route '/dropout-repeaters'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DropoutRepeaterController::index
 * @see app/Http/Controllers/DropoutRepeaterController.php:10
 * @route '/dropout-repeaters'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DropoutRepeaterController::index
 * @see app/Http/Controllers/DropoutRepeaterController.php:10
 * @route '/dropout-repeaters'
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
* @see \App\Http\Controllers\DropoutRepeaterController::store
 * @see app/Http/Controllers/DropoutRepeaterController.php:20
 * @route '/dropout-repeaters'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dropout-repeaters',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DropoutRepeaterController::store
 * @see app/Http/Controllers/DropoutRepeaterController.php:20
 * @route '/dropout-repeaters'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DropoutRepeaterController::store
 * @see app/Http/Controllers/DropoutRepeaterController.php:20
 * @route '/dropout-repeaters'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DropoutRepeaterController::store
 * @see app/Http/Controllers/DropoutRepeaterController.php:20
 * @route '/dropout-repeaters'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DropoutRepeaterController::store
 * @see app/Http/Controllers/DropoutRepeaterController.php:20
 * @route '/dropout-repeaters'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\DropoutRepeaterController::show
 * @see app/Http/Controllers/DropoutRepeaterController.php:33
 * @route '/dropout-repeaters/{dropout_repeater}'
 */
export const show = (args: { dropout_repeater: number | { id: number } } | [dropout_repeater: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/dropout-repeaters/{dropout_repeater}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DropoutRepeaterController::show
 * @see app/Http/Controllers/DropoutRepeaterController.php:33
 * @route '/dropout-repeaters/{dropout_repeater}'
 */
show.url = (args: { dropout_repeater: number | { id: number } } | [dropout_repeater: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dropout_repeater: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { dropout_repeater: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    dropout_repeater: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        dropout_repeater: typeof args.dropout_repeater === 'object'
                ? args.dropout_repeater.id
                : args.dropout_repeater,
                }

    return show.definition.url
            .replace('{dropout_repeater}', parsedArgs.dropout_repeater.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DropoutRepeaterController::show
 * @see app/Http/Controllers/DropoutRepeaterController.php:33
 * @route '/dropout-repeaters/{dropout_repeater}'
 */
show.get = (args: { dropout_repeater: number | { id: number } } | [dropout_repeater: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DropoutRepeaterController::show
 * @see app/Http/Controllers/DropoutRepeaterController.php:33
 * @route '/dropout-repeaters/{dropout_repeater}'
 */
show.head = (args: { dropout_repeater: number | { id: number } } | [dropout_repeater: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DropoutRepeaterController::show
 * @see app/Http/Controllers/DropoutRepeaterController.php:33
 * @route '/dropout-repeaters/{dropout_repeater}'
 */
    const showForm = (args: { dropout_repeater: number | { id: number } } | [dropout_repeater: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DropoutRepeaterController::show
 * @see app/Http/Controllers/DropoutRepeaterController.php:33
 * @route '/dropout-repeaters/{dropout_repeater}'
 */
        showForm.get = (args: { dropout_repeater: number | { id: number } } | [dropout_repeater: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DropoutRepeaterController::show
 * @see app/Http/Controllers/DropoutRepeaterController.php:33
 * @route '/dropout-repeaters/{dropout_repeater}'
 */
        showForm.head = (args: { dropout_repeater: number | { id: number } } | [dropout_repeater: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\DropoutRepeaterController::update
 * @see app/Http/Controllers/DropoutRepeaterController.php:43
 * @route '/dropout-repeaters/{dropout_repeater}'
 */
export const update = (args: { dropout_repeater: number | { id: number } } | [dropout_repeater: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dropout-repeaters/{dropout_repeater}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\DropoutRepeaterController::update
 * @see app/Http/Controllers/DropoutRepeaterController.php:43
 * @route '/dropout-repeaters/{dropout_repeater}'
 */
update.url = (args: { dropout_repeater: number | { id: number } } | [dropout_repeater: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dropout_repeater: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { dropout_repeater: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    dropout_repeater: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        dropout_repeater: typeof args.dropout_repeater === 'object'
                ? args.dropout_repeater.id
                : args.dropout_repeater,
                }

    return update.definition.url
            .replace('{dropout_repeater}', parsedArgs.dropout_repeater.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DropoutRepeaterController::update
 * @see app/Http/Controllers/DropoutRepeaterController.php:43
 * @route '/dropout-repeaters/{dropout_repeater}'
 */
update.put = (args: { dropout_repeater: number | { id: number } } | [dropout_repeater: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\DropoutRepeaterController::update
 * @see app/Http/Controllers/DropoutRepeaterController.php:43
 * @route '/dropout-repeaters/{dropout_repeater}'
 */
update.patch = (args: { dropout_repeater: number | { id: number } } | [dropout_repeater: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\DropoutRepeaterController::update
 * @see app/Http/Controllers/DropoutRepeaterController.php:43
 * @route '/dropout-repeaters/{dropout_repeater}'
 */
    const updateForm = (args: { dropout_repeater: number | { id: number } } | [dropout_repeater: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DropoutRepeaterController::update
 * @see app/Http/Controllers/DropoutRepeaterController.php:43
 * @route '/dropout-repeaters/{dropout_repeater}'
 */
        updateForm.put = (args: { dropout_repeater: number | { id: number } } | [dropout_repeater: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\DropoutRepeaterController::update
 * @see app/Http/Controllers/DropoutRepeaterController.php:43
 * @route '/dropout-repeaters/{dropout_repeater}'
 */
        updateForm.patch = (args: { dropout_repeater: number | { id: number } } | [dropout_repeater: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\DropoutRepeaterController::destroy
 * @see app/Http/Controllers/DropoutRepeaterController.php:58
 * @route '/dropout-repeaters/{dropout_repeater}'
 */
export const destroy = (args: { dropout_repeater: number | { id: number } } | [dropout_repeater: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dropout-repeaters/{dropout_repeater}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DropoutRepeaterController::destroy
 * @see app/Http/Controllers/DropoutRepeaterController.php:58
 * @route '/dropout-repeaters/{dropout_repeater}'
 */
destroy.url = (args: { dropout_repeater: number | { id: number } } | [dropout_repeater: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { dropout_repeater: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { dropout_repeater: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    dropout_repeater: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        dropout_repeater: typeof args.dropout_repeater === 'object'
                ? args.dropout_repeater.id
                : args.dropout_repeater,
                }

    return destroy.definition.url
            .replace('{dropout_repeater}', parsedArgs.dropout_repeater.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DropoutRepeaterController::destroy
 * @see app/Http/Controllers/DropoutRepeaterController.php:58
 * @route '/dropout-repeaters/{dropout_repeater}'
 */
destroy.delete = (args: { dropout_repeater: number | { id: number } } | [dropout_repeater: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\DropoutRepeaterController::destroy
 * @see app/Http/Controllers/DropoutRepeaterController.php:58
 * @route '/dropout-repeaters/{dropout_repeater}'
 */
    const destroyForm = (args: { dropout_repeater: number | { id: number } } | [dropout_repeater: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DropoutRepeaterController::destroy
 * @see app/Http/Controllers/DropoutRepeaterController.php:58
 * @route '/dropout-repeaters/{dropout_repeater}'
 */
        destroyForm.delete = (args: { dropout_repeater: number | { id: number } } | [dropout_repeater: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const dropoutRepeaters = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default dropoutRepeaters