import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SchoolYearController::index
 * @see app/Http/Controllers/SchoolYearController.php:10
 * @route '/school-years'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/school-years',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SchoolYearController::index
 * @see app/Http/Controllers/SchoolYearController.php:10
 * @route '/school-years'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SchoolYearController::index
 * @see app/Http/Controllers/SchoolYearController.php:10
 * @route '/school-years'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SchoolYearController::index
 * @see app/Http/Controllers/SchoolYearController.php:10
 * @route '/school-years'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SchoolYearController::index
 * @see app/Http/Controllers/SchoolYearController.php:10
 * @route '/school-years'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SchoolYearController::index
 * @see app/Http/Controllers/SchoolYearController.php:10
 * @route '/school-years'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SchoolYearController::index
 * @see app/Http/Controllers/SchoolYearController.php:10
 * @route '/school-years'
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
* @see \App\Http\Controllers\SchoolYearController::store
 * @see app/Http/Controllers/SchoolYearController.php:20
 * @route '/school-years'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/school-years',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SchoolYearController::store
 * @see app/Http/Controllers/SchoolYearController.php:20
 * @route '/school-years'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SchoolYearController::store
 * @see app/Http/Controllers/SchoolYearController.php:20
 * @route '/school-years'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SchoolYearController::store
 * @see app/Http/Controllers/SchoolYearController.php:20
 * @route '/school-years'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SchoolYearController::store
 * @see app/Http/Controllers/SchoolYearController.php:20
 * @route '/school-years'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\SchoolYearController::show
 * @see app/Http/Controllers/SchoolYearController.php:31
 * @route '/school-years/{school_year}'
 */
export const show = (args: { school_year: number | { id: number } } | [school_year: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/school-years/{school_year}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SchoolYearController::show
 * @see app/Http/Controllers/SchoolYearController.php:31
 * @route '/school-years/{school_year}'
 */
show.url = (args: { school_year: number | { id: number } } | [school_year: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { school_year: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { school_year: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    school_year: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        school_year: typeof args.school_year === 'object'
                ? args.school_year.id
                : args.school_year,
                }

    return show.definition.url
            .replace('{school_year}', parsedArgs.school_year.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SchoolYearController::show
 * @see app/Http/Controllers/SchoolYearController.php:31
 * @route '/school-years/{school_year}'
 */
show.get = (args: { school_year: number | { id: number } } | [school_year: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SchoolYearController::show
 * @see app/Http/Controllers/SchoolYearController.php:31
 * @route '/school-years/{school_year}'
 */
show.head = (args: { school_year: number | { id: number } } | [school_year: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SchoolYearController::show
 * @see app/Http/Controllers/SchoolYearController.php:31
 * @route '/school-years/{school_year}'
 */
    const showForm = (args: { school_year: number | { id: number } } | [school_year: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SchoolYearController::show
 * @see app/Http/Controllers/SchoolYearController.php:31
 * @route '/school-years/{school_year}'
 */
        showForm.get = (args: { school_year: number | { id: number } } | [school_year: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SchoolYearController::show
 * @see app/Http/Controllers/SchoolYearController.php:31
 * @route '/school-years/{school_year}'
 */
        showForm.head = (args: { school_year: number | { id: number } } | [school_year: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\SchoolYearController::update
 * @see app/Http/Controllers/SchoolYearController.php:41
 * @route '/school-years/{school_year}'
 */
export const update = (args: { school_year: number | { id: number } } | [school_year: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/school-years/{school_year}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\SchoolYearController::update
 * @see app/Http/Controllers/SchoolYearController.php:41
 * @route '/school-years/{school_year}'
 */
update.url = (args: { school_year: number | { id: number } } | [school_year: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { school_year: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { school_year: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    school_year: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        school_year: typeof args.school_year === 'object'
                ? args.school_year.id
                : args.school_year,
                }

    return update.definition.url
            .replace('{school_year}', parsedArgs.school_year.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SchoolYearController::update
 * @see app/Http/Controllers/SchoolYearController.php:41
 * @route '/school-years/{school_year}'
 */
update.put = (args: { school_year: number | { id: number } } | [school_year: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\SchoolYearController::update
 * @see app/Http/Controllers/SchoolYearController.php:41
 * @route '/school-years/{school_year}'
 */
update.patch = (args: { school_year: number | { id: number } } | [school_year: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\SchoolYearController::update
 * @see app/Http/Controllers/SchoolYearController.php:41
 * @route '/school-years/{school_year}'
 */
    const updateForm = (args: { school_year: number | { id: number } } | [school_year: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SchoolYearController::update
 * @see app/Http/Controllers/SchoolYearController.php:41
 * @route '/school-years/{school_year}'
 */
        updateForm.put = (args: { school_year: number | { id: number } } | [school_year: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\SchoolYearController::update
 * @see app/Http/Controllers/SchoolYearController.php:41
 * @route '/school-years/{school_year}'
 */
        updateForm.patch = (args: { school_year: number | { id: number } } | [school_year: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\SchoolYearController::destroy
 * @see app/Http/Controllers/SchoolYearController.php:54
 * @route '/school-years/{school_year}'
 */
export const destroy = (args: { school_year: number | { id: number } } | [school_year: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/school-years/{school_year}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SchoolYearController::destroy
 * @see app/Http/Controllers/SchoolYearController.php:54
 * @route '/school-years/{school_year}'
 */
destroy.url = (args: { school_year: number | { id: number } } | [school_year: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { school_year: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { school_year: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    school_year: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        school_year: typeof args.school_year === 'object'
                ? args.school_year.id
                : args.school_year,
                }

    return destroy.definition.url
            .replace('{school_year}', parsedArgs.school_year.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SchoolYearController::destroy
 * @see app/Http/Controllers/SchoolYearController.php:54
 * @route '/school-years/{school_year}'
 */
destroy.delete = (args: { school_year: number | { id: number } } | [school_year: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\SchoolYearController::destroy
 * @see app/Http/Controllers/SchoolYearController.php:54
 * @route '/school-years/{school_year}'
 */
    const destroyForm = (args: { school_year: number | { id: number } } | [school_year: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SchoolYearController::destroy
 * @see app/Http/Controllers/SchoolYearController.php:54
 * @route '/school-years/{school_year}'
 */
        destroyForm.delete = (args: { school_year: number | { id: number } } | [school_year: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const SchoolYearController = { index, store, show, update, destroy }

export default SchoolYearController