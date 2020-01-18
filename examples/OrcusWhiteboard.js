"use strict";
import Orcus from 'react-orcus';

function OrcusWhiteboard (props) {
    
    return (
        
        <Orcus.Desktop
            shortcuts={false}
            taskbar={false}
            programMenu={false}
        />
            <Orcus.App
                slug="file-manager"
                name="File Manager"
                icon="file"
                initialOpened={true}
                initialPosition={[150, 200, 500, 300]}    //{x, y, w, h}
            >
                <h1>Welcome to my File Manager</h1>
                
                <p>Yeah so.... building a file manager is really hard.
                But please enjoy this complimentary welcome paragraph!</p>
            </Orcus.App>
            
            <Orcus.App
                slug="tetris"
                name="Tetris"
                icon="blocks"
                initialPosition={[550, 200, 200, 600]}    //{x, y, w, h}
            >
                <p>Does anyone know how to build a tetris game?</p>
            </Orcus.App>
        </Orcus.Dektop>
        
    );
    
}

export OrcusWhiteboard;
