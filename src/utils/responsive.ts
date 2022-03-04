
   
import { Dimensions, PixelRatio } from 'react-native';

const {width,height} = Dimensions.get('window');


const wp = (widthPercent:number):number => {
    return PixelRatio.roundToNearestPixel(width * widthPercent / 100);
};

const hp = (heightPercent:number):number => {
    return PixelRatio.roundToNearestPixel(height * heightPercent / 100);
};

export{
    wp,hp
}