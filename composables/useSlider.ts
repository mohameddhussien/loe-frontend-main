import { useSwiper } from 'swiper/vue';
import type { SwiperOptions } from 'swiper/types';


const useSlider = () => {
    interface SwiperBreakpoints {
        [width: number]: SwiperOptions;
        [ratio: string]: SwiperOptions;
    }

    const comingSoonBreakpoints: SwiperBreakpoints = {
        '340': { slidesPerView: 1 },
        '720': { slidesPerView: 2 },
        '1120': { slidesPerView: 3 },
    }
    const swiper = useSwiper()

    return {
        swiper,
        comingSoonBreakpoints
    }
}

export { useSlider }