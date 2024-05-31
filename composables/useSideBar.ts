const isSideBarOpen = ref(false)

const useSideBar = () => {

    const toggleSideBar = () => {
        isSideBarOpen.value = !isSideBarOpen.value
    }

    return {
        toggleSideBar
    }
}

export {
    isSideBarOpen,
    useSideBar,
}