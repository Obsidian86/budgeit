export const updateView = (view, parent, lastView, saveState) => {
    if(parent || (view && view !== lastView) ){
        let parentTop = 0
        let subTract = 90
        if(parent){
            const parentEl = document.getElementById(parent)
            parentTop = parentEl.offsetTop || 0
            subTract = window.innerWidth <= 1000 ? 400 : 200
        }
        const targ = document.getElementById(view)
        const top = (!view || !targ || view === 'default') ? 0 : targ.offsetTop - subTract + parentTop
        window.scrollTo(0, top)
        saveState({lastView: view})
    }
}