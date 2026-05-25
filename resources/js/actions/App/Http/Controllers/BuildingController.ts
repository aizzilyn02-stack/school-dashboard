import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\BuildingController::index
 * @see app/Http/Controllers/BuildingController.php:10
 * @route '/buildings'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/buildings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BuildingController::index
 * @see app/Http/Controllers/BuildingController.php:10
 * @route '/buildings'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BuildingController::index
 * @see app/Http/Controllers/BuildingController.php:10
 * @route '/buildings'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BuildingController::index
 * @see app/Http/Controllers/BuildingController.php:10
 * @route '/buildings'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BuildingController::index
 * @see app/Http/Controllers/BuildingController.php:10
 * @route '/buildings'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BuildingController::index
 * @see app/Http/Controllers/BuildingController.php:10
 * @route '/buildings'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BuildingController::index
 * @see app/Http/Controllers/BuildingController.php:10
 * @route '/buildings'
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
* @see \App\Http\Controllers\BuildingController::store
 * @see app/Http/Controllers/BuildingController.php:20
 * @route '/buildings'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/buildings',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BuildingController::store
 * @see app/Http/Controllers/BuildingController.php:20
 * @route '/buildings'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BuildingController::store
 * @see app/Http/Controllers/BuildingController.php:20
 * @route '/buildings'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BuildingController::store
 * @see app/Http/Controllers/BuildingController.php:20
 * @route '/buildings'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BuildingController::store
 * @see app/Http/Controllers/BuildingController.php:20
 * @route '/buildings'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\BuildingController::show
 * @see app/Http/Controllers/BuildingController.php:33
 * @route '/buildings/{building}'
 */
export const show = (args: { building: number | { id: number } } | [building: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/buildings/{building}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BuildingController::show
 * @see app/Http/Controllers/BuildingController.php:33
 * @route '/buildings/{building}'
 */
show.url = (args: { building: number | { id: number } } | [building: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { building: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { building: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    building: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        building: typeof args.building === 'object'
                ? args.building.id
                : args.building,
                }

    return show.definition.url
            .replace('{building}', parsedArgs.building.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BuildingController::show
 * @see app/Http/Controllers/BuildingController.php:33
 * @route '/buildings/{building}'
 */
show.get = (args: { building: number | { id: number } } | [building: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BuildingController::show
 * @see app/Http/Controllers/BuildingController.php:33
 * @route '/buildings/{building}'
 */
show.head = (args: { building: number | { id: number } } | [building: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BuildingController::show
 * @see app/Http/Controllers/BuildingController.php:33
 * @route '/buildings/{building}'
 */
    const showForm = (args: { building: number | { id: number } } | [building: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BuildingController::show
 * @see app/Http/Controllers/BuildingController.php:33
 * @route '/buildings/{building}'
 */
        showForm.get = (args: { building: number | { id: number } } | [building: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BuildingController::show
 * @see app/Http/Controllers/BuildingController.php:33
 * @route '/buildings/{building}'
 */
        showForm.head = (args: { building: number | { id: number } } | [building: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\BuildingController::update
 * @see app/Http/Controllers/BuildingController.php:43
 * @route '/buildings/{building}'
 */
export const update = (args: { building: number | { id: number } } | [building: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/buildings/{building}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\BuildingController::update
 * @see app/Http/Controllers/BuildingController.php:43
 * @route '/buildings/{building}'
 */
update.url = (args: { building: number | { id: number } } | [building: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { building: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { building: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    building: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        building: typeof args.building === 'object'
                ? args.building.id
                : args.building,
                }

    return update.definition.url
            .replace('{building}', parsedArgs.building.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BuildingController::update
 * @see app/Http/Controllers/BuildingController.php:43
 * @route '/buildings/{building}'
 */
update.put = (args: { building: number | { id: number } } | [building: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\BuildingController::update
 * @see app/Http/Controllers/BuildingController.php:43
 * @route '/buildings/{building}'
 */
update.patch = (args: { building: number | { id: number } } | [building: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\BuildingController::update
 * @see app/Http/Controllers/BuildingController.php:43
 * @route '/buildings/{building}'
 */
    const updateForm = (args: { building: number | { id: number } } | [building: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BuildingController::update
 * @see app/Http/Controllers/BuildingController.php:43
 * @route '/buildings/{building}'
 */
        updateForm.put = (args: { building: number | { id: number } } | [building: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\BuildingController::update
 * @see app/Http/Controllers/BuildingController.php:43
 * @route '/buildings/{building}'
 */
        updateForm.patch = (args: { building: number | { id: number } } | [building: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\BuildingController::destroy
 * @see app/Http/Controllers/BuildingController.php:58
 * @route '/buildings/{building}'
 */
export const destroy = (args: { building: number | { id: number } } | [building: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/buildings/{building}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\BuildingController::destroy
 * @see app/Http/Controllers/BuildingController.php:58
 * @route '/buildings/{building}'
 */
destroy.url = (args: { building: number | { id: number } } | [building: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { building: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { building: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    building: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        building: typeof args.building === 'object'
                ? args.building.id
                : args.building,
                }

    return destroy.definition.url
            .replace('{building}', parsedArgs.building.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BuildingController::destroy
 * @see app/Http/Controllers/BuildingController.php:58
 * @route '/buildings/{building}'
 */
destroy.delete = (args: { building: number | { id: number } } | [building: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\BuildingController::destroy
 * @see app/Http/Controllers/BuildingController.php:58
 * @route '/buildings/{building}'
 */
    const destroyForm = (args: { building: number | { id: number } } | [building: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BuildingController::destroy
 * @see app/Http/Controllers/BuildingController.php:58
 * @route '/buildings/{building}'
 */
        destroyForm.delete = (args: { building: number | { id: number } } | [building: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const BuildingController = { index, store, show, update, destroy }

export default BuildingController