import { useState, useEffect } from 'react';

import Card from "./Card";
import List from "./List";

import useHttp from "../hooks/useHttp";

import './ListContainer.css';

function ListContainer (props) {
    const [ lists, setLists ] = useState([]);
    const { shopFilter, dbLists, dbItems } = props;

    //////////////////// http
    const { sendRequest : handleRequest} = useHttp();

    const submitItem = (formData) => {
        const itemConfig = {
            url: 'http://localhost:3000/add-to-list',
            method: 'POST',
            headers: {
              'Access-Control-Allow-Credentials': true,
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: formData
        };
        handleRequest(itemConfig, () => props.updateLists());
    };

    const removeItem = (listName, itemId) => {
        const itemConfig = {
            url: 'http://localhost:3000/remove-from-list',
            method: 'DELETE',
            headers: {
              'Access-Control-Allow-Credentials': true,
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: {listName, itemId}
        };
        
        handleRequest(itemConfig, () => props.updateLists());
    };
    ///////////////////////////////

    const renderLists = () => {
        let listsToRender = [];
        let listContent = <p>There are no lists.</p>
        
        let filtered = lists.filter(list => list.shop.name.includes(shopFilter));
        shopFilter? listsToRender = filtered : listsToRender = lists;
        
        listContent = listsToRender.map(list => 
            <List 
                key={list._id} name={list.name} shop={list.shop.name} items={list.items} id={list._id}
                dbItems={dbItems} submitItem={submitItem} removeItem={removeItem}
            />
        );
        if(listsToRender.length < 1) listContent = <p>There are no lists.</p>
        
        return listContent;
      };

    useEffect(() => {
        setLists(dbLists);
    }, [dbLists]);

    return(
        <Card className='list-container'>
            { renderLists() }
        </Card>
    );
};

export default ListContainer;