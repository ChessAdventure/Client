// this component is not in use

import Gameboard from '../UIComponents/Gameboard/Gameboard'

interface PropTypes {
    width: number;
    orientation?: 'white' | 'black' | undefined;
    draggable?: boolean;
    fen?: string;
    onDrop?: any;
    position?: any;
}

const OldGameBoard = ({ fen }: PropTypes) => {
    return (
        <Gameboard width={200}/>
    )
}

export default OldGameBoard