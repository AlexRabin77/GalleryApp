import React, { useState, useEffect, useCallback } from 'react';
import { StylesProvider } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import ImageViewer from './components/ImageViewer';
import ImageCarousel from './components/ImageCarousel';

const App = () => {
    const [images, setImages] = useState([]); 
    const [excludeIds, setExcludeIds] = useState([]); 
    const [selectedImage, setSelectedImage] = useState({ url: '', author: '' }); 

    const changeSelectedImage = useCallback(id => {
        const { download_url: url = '', author = '' } = images.find(img => img.id === id) || {};
        setSelectedImage({ url, author });
    }, [images]);

    const fetchImages = useCallback(async () => {
        const response = await fetch('/api/Images/GetRandomImages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                excludeIds
            })
        });

        const images = await response.json();
        setImages(images);
    }, [excludeIds]);

    useEffect(() => {
        fetchImages();

        let iddleInterval = null;

        const startIddleDetction = () => {
            iddleInterval = setInterval(() => fetchImages(), 10000);
            document.addEventListener("mousemove", stopIddleDetection, false);
            document.addEventListener("mousedown", stopIddleDetection, false);
            document.addEventListener("keypress", stopIddleDetection, false);
            document.addEventListener("touchmove", stopIddleDetection, false);
        };

        const stopIddleDetection = () => {
            clearInterval(iddleInterval);
            startIddleDetction();
        };

        startIddleDetction();
    }, []);

    useEffect(() => {
        if (images.length > 0) {
            const { download_url: url = '', author = '' } = images[2] || {};
            setSelectedImage({ url, author });

            const nextExcludeIds = images.map(({ id }) => id);
            setExcludeIds([...excludeIds, ...nextExcludeIds]);
        }
    }, [images]);

    return (
        <StylesProvider injectFirst>
            <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                <Grid item container xs={6} justify="center">
                    <Grid item xs={6}>
                        <ImageViewer {...selectedImage} />
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <ImageCarousel images={images} onClick={id => changeSelectedImage(id)} />
                </Grid>
            </Grid>
        </StylesProvider>
    );
};

export default App;
