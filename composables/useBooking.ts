import { Adult, Child, type ExpandPerson, type ExpandAdult } from '@/classes/person';
type Variant = 'primary' | 'secondary' | 'outline-primary' | 'outline-secondary' | 'white' | 'outline-white' | 'black' | 'outline-black' | 'disabled' | 'primary-lighter'
type SelectedPerson = {
    adultIndex?: number;
    childIndex?: number;
};

const personCounter = ref<number>(1);
const selectedPerson = ref<SelectedPerson>({});
const Adults = reactive<Adult[]>([new Adult()]);

const initializeExpand: ExpandAdult = { adult: false, children: [] };
const expandPerson = reactive<ExpandPerson>(
    Adults.map(adult => ({
        adult: false,
        children: adult.children.map(() => ({ expand: false }))
    }))
);

const useBooking = () => {
    const limitPersonCount = 30;
    const addAdult = (): void => {
        if (personCounter.value < limitPersonCount) {
            expandPerson?.push({ ...initializeExpand });
            Adults.push(new Adult());
            personCounter.value++;
            return
        }
        console.log("Cannot add more than limitPersonCount people.");
    };

    const removeLastAdult = (): void => {
        if (Adults.length <= 1) {
            console.log("Cannot remove the last adult.");
            return
        }
        const lastAdult = Adults[Adults.length - 1];
        const totalToRemove = 1 + lastAdult.children.length;

        if (personCounter.value - totalToRemove >= 1) {
            personCounter.value -= totalToRemove;
            expandPerson.pop();
            Adults.pop();
            return
        }
        console.log("Cannot have less than 1 person.");
    };

    const removeSpecificAdult = (index: number): void => {
        if (Adults.length <= 1) {
            console.log("Cannot remove the last adult.");
            return
        }
        const adult = Adults[index];
        const totalToRemove = 1 + adult.children.length;

        if (personCounter.value - totalToRemove >= 1) {
            personCounter.value -= totalToRemove;
            expandPerson.splice(index, 1);
            Adults.splice(index, 1);
            return
        }
        console.log("Cannot have less than 1 person.");
    };

    const addChildOfAdult = (adultIndex: number): void => {
        if (personCounter.value < limitPersonCount) {
            expandPerson?.push({ ...initializeExpand });
            expandPerson[adultIndex].children.push({ expand: false })
            Adults[adultIndex].children.push(new Child());
            personCounter.value++;
            return
        }
        console.log("Cannot add more than limitPersonCount people.");
    };

    const removeChildOfAdult = (adultIndex: number, childIndex: number): void => {
        if (Adults[adultIndex].children.length > 0) {
            expandPerson[adultIndex].children.splice(childIndex, 1);
            Adults[adultIndex].children.splice(childIndex, 1);
            personCounter.value--;
            return
        }
        console.log("No children to remove.");
    };

    const disabledRemoveAdult = computed(() => personCounter.value <= 1);
    const disabledAddAdult = computed(() => personCounter.value >= limitPersonCount);

    const addButtonClasses = (variant: Variant) => {
        return {
            [variant]: !disabledAddAdult.value,
            'disabled': disabledAddAdult.value
        }
    };

    const removeButtonClasses = (variant: Variant) => {
        return {
            [variant]: !disabledRemoveAdult.value,
            'disabled': disabledRemoveAdult.value
        }
    };

    const toggleExpandAdult = (index: number) => {
        expandPerson[index].adult = !expandPerson[index].adult;
    };
    const toggleExpandChildOfAdult = (adult_index: number, child_index: number) => {
        expandPerson[adult_index].children[child_index].expand = !expandPerson[adult_index].children[child_index].expand;
    };

    const scrollToPerson = (adult_index?: number, child_index?: number) => {
        if (adult_index !== undefined) {
            scrollToAdult(adult_index);

            if (child_index !== undefined) {
                const id = setTimeout(() => {
                    scrollToChildOfAdult(child_index)
                    clearTimeout(id)
                }, 500)
            }
        }
    };

    const scrollToElement = (str: string) => {
        const targetElement = document.querySelector(`#${str}`);

        if (targetElement)
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    const scrollToAdult = (adult_index: number) => {
        scrollToElement(`adult-${adult_index}`)
    };

    const scrollToChildOfAdult = (child_index: number) => {
        scrollToElement(`child-${child_index}`)
    };

    const selectPerson = (adult_index?: number, child_index?: number) => {
        selectedPerson.value = { adultIndex: adult_index, childIndex: child_index }

        const id = setTimeout(() => {
            selectedPerson.value = { adultIndex: undefined, childIndex: undefined }
            clearTimeout(id)
        }, 3000);
    };

    const toggleExpandAll = (val: boolean) => {
        console.log(val)
        expandPerson.forEach(p => {
            p.adult = val
            p.children.forEach(s => {
                s.expand = val
            })
        })
    }
    const purchaseEvent = (event: any) => {

    }

    return {
        addAdult,
        removeLastAdult,
        removeSpecificAdult,
        addChildOfAdult,
        removeChildOfAdult,
        disabledAddAdult,
        disabledRemoveAdult,
        addButtonClasses,
        removeButtonClasses,
        toggleExpandAdult,
        toggleExpandChildOfAdult,
        toggleExpandAll,
        scrollToPerson,
        selectPerson,
        purchaseEvent,
        scrollToElement
    }
}

export {
    Adults,
    personCounter,
    useBooking,
    expandPerson,
    selectedPerson
};
export type { Variant };
