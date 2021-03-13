import {
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import ElementActionButtons from './ElementActionButtons';

export default class ElementList extends React.Component {
    constructor(props) {
        super(props);

        this.state = { open: false };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(value) {
        this.setState({ open: !value });
    }

    render() {
        return (
            <List component="nav">
                {this.props.elementList.map((element) => {
                    const key = element.key;
                    const value = element.value;

                    if (Array.isArray(value)) {
                        return (
                            <>
                                <ListItem key={`${key}.list`}>
                                    {this.state.open ? (
                                        <IconButton
                                            onClick={() =>
                                                this.handleClick(
                                                    this.state.open
                                                )
                                            }
                                            edge="start"
                                        >
                                            <ExpandLessIcon fontSize="small" />
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            onClick={() =>
                                                this.handleClick(
                                                    this.state.open
                                                )
                                            }
                                            edge="start"
                                        >
                                            <ExpandMoreIcon fontSize="small" />
                                        </IconButton>
                                    )}
                                    <ListItemText primary={key} />
                                    <ElementActionButtons
                                        value={key}
                                        isComplex={true}
                                        editItem={this.props.editItem}
                                        deleteItem={this.props.deleteItem}
                                    />
                                </ListItem>
                                <Collapse
                                    key={`${key}.collapse`}
                                    in={this.state.open}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <ElementList
                                        elementList={value}
                                        deleteItem={this.props.deleteItem}
                                    />
                                </Collapse>
                            </>
                        );
                    } else {
                        return (
                            <ListItem key={value}>
                                <ListItemText primary={key} secondary={value} />
                                <ElementActionButtons
                                    element={element}
                                    isComplex={false}
                                    editItem={this.props.editItem}
                                    deleteItem={this.props.deleteItem}
                                />
                            </ListItem>
                        );
                    }
                })}
            </List>
        );
    }
}
