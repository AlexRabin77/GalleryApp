import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import ItemsCarousel from 'react-items-carousel';

const noOfCards = 3;
const chevronWidth = 40;

const Wrapper = styled.div`
  padding: 0 ${chevronWidth}px;
  max-width: 1000px;
  margin: 0 auto;
`;

const SlideItem = styled.div`
  height: 200px;
  background: #EEE;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;

const Img = styled.img`
    width: 170px;
    height: 170px;
    cursor: pointer;
`;

const ImageCarousel = ({ images = [], onClick = () => { } }) => {
    const carouselItems = useMemo(() => images.map(({ id, author, download_url}) => (
        <SlideItem key={id}>
            <Img src={download_url} alt={author} onClick={() => onClick(id)} />
        </SlideItem>
    )), [images, onClick]);

    const [activeItemIndex, setActiveItemIndex] = useState(0);

    const onChange = value => setActiveItemIndex(value);

    return (
        <Wrapper>
            <ItemsCarousel
                gutter={12}
                numberOfCards={noOfCards}
                activeItemIndex={activeItemIndex}
                requestToChangeActive={onChange}
                rightChevron={<button>{'>'}</button>}
                leftChevron={<button>{'<'}</button>}
                chevronWidth={chevronWidth}
                outsideChevron
                children={carouselItems}
            />
        </Wrapper>
    );
};

export default ImageCarousel;
