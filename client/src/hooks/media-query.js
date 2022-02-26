import {useEffect, useState} from "react";

export const useMediaFix = () => {

    /* Locale State */
    const [media, setMedia] = useState('desktop');

    useEffect(() => {
        switch (media) {
            case 'mobile':
                mediaMobile();
                break;
            case 'desktop':
                desktop();
                break;
            default:
                desktop();
        }
    }, [media]);

    /* All Hook Functions */
    const mediaMobile = () => {
        const appContainer = document.querySelector('body');
        appContainer.classList.remove('desktop');
        appContainer.classList.add('mobile');
    };

    const desktop = () => {
        const appContainer = document.querySelector('body');
        appContainer.classList.remove('mobile');
        appContainer.classList.add('desktop');
    };

    const mediaFix = () => {
        const rootContainer = document.getElementById('root');
        const rootRect = rootContainer.getBoundingClientRect();
        const rootWidth = rootRect.width;

        if(rootWidth < 1024) {
            setMedia('mobile');
            return 'mobile'
        } else {
            setMedia('desktop');
            return 'desktop'
        }
    }

    return {mediaFix};
};
