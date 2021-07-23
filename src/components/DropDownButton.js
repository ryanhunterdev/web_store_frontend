import { MenuButton } from "@chakra-ui/react"

const DropDownButton = (props) => {

    const { content } = props;

    return ( 
        <MenuButton
            style={{
                display: "flex",
                flexDirection: "row"
            }}
        >{content}
            <span class="material-icons">
                expand_more
            </span>
        </MenuButton>
);
}
 
export default DropDownButton;