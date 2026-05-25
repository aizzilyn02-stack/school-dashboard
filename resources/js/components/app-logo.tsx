export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm shadow-slate-900/5 ring-1 ring-slate-200">
                <img
                    src="/diladila-logo.svg"
                    alt="DILADILA ELEMENTARY SCHOOL logo"
                    className="h-10 w-10 object-contain"
                />
            </div>
            <div className="ml-3 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold text-slate-900 dark:text-white">
                    DILADILA ELEMENTARY SCHOOL
                </span>
            </div>
        </>
    );
}
