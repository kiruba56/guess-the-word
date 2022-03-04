import React from 'react';
import {Pressable, ViewStyle} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle,withSpring } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
interface Props {
    container?: ViewStyle
    onPress?():void,
    bounce?:number
}

const Bouncy:React.FC<Props> = ({children,onPress,container,bounce=0.95}) => {
    const offset = useSharedValue(1);

    const on_in = () =>  {
        offset.value = withSpring(bounce,{
            damping:2,
            mass:1,
            stiffness:100
        });
    }
    const on_out = () => {
        offset.value = withSpring(1,{
            damping:2,
            mass:1,
            stiffness:100
        });
    }
 

    const animated_styles = useAnimatedStyle(() => {
        return {
          transform: [{ scale: offset.value}],
        };
    });

    return (
        <AnimatedPressable onPressIn={on_in} onPress={onPress}  onPressOut={on_out} style={[animated_styles,container]}>
             {children}
        </AnimatedPressable>
    )
};


export default Bouncy;