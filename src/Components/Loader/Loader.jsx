import { Oval } from 'react-loader-spinner';

const Loader = ({w, h, className, style}) => {
    return (
        <Oval
            height={w}
            width={h}
            wrapperStyle={style}
            wrapperClass={className}
            visible={true}
            ariaLabel='oval-loading'
            strokeWidth={5}
            strokeWidthSecondary={5}
            color="black"
            secondaryColor='black'

        />        
    )
}

export default Loader;