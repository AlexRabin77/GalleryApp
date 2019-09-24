import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const ImageViewer = ({ url = '', author = '' }) => {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={url}
                    title={author}
                    onMouseEnter={() => setChecked(true)}
                    onMouseLeave={() => setChecked(false)}
                />
                <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {author}
                        </Typography>
                    </CardContent>
                </Slide>
            </CardActionArea>
        </Card>
    );
};

export default ImageViewer;
