import React, { useState } from 'react';

//Desestruturação, não recebo todo o objeto.
function Header({ title }){
    return(
        <header>
            <h1>{title}</h1>
        </header>
    );
}

export default Header;

//Possível parssar conteúdo dentro da tag de component Header e obter o dado através do props.children.
//useState returna um array.