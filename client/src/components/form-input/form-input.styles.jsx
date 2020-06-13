import styled, {css} from 'styled-components';
const sub_color = 'grey';
const shrinkLabel = css`
    top: -14px;
    font-size: 12px;
    color: black;
`; 

export const GroupContainer = styled.div`
    position: relative;
    margin: 45px 0;
    input[type='password'] {
        letter-spacing: 0.3em;
    }
`;

export const FormInputContainer = styled.input`
    background: none;
    background-color: white;
    color: ${sub_color};
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid ${sub_color};
    margin: 25px 0;

    &:focus {
      outline: none;
    }

    &:focus ~ label {
        ${shrinkLabel};
    }
`;

const shrinkClass = ({ value }) => {
    if( value.length ) {
        return shrinkLabel
    }
    return '';
}

export const FormInputLabelContainer = styled.label`
    color: ${sub_color};
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 300ms ease all;
    ${shrinkClass}
`;