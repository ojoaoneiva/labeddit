import { HeaderStyle } from './HeaderStyled'
import logo from '../../assets/logo.svg'

export const Header = () => {
    return (
        <HeaderStyle>
            <img src={logo} />
        </HeaderStyle>
    )
}