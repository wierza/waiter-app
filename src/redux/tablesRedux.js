import { setLoading } from "./loaderRedux.js";
import { API_URL } from "../config.js";
//selectors

export const getAllTables = (state) => state.tables;
export const getTableById = ({ tables }, id) => tables.find((table) => table.id === id);

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');

// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const editTable = (payload) => ({ type: EDIT_TABLE, payload });


export const fetchTables = () => {
    return (dispatch) => {
        dispatch(setLoading(true));

        fetch(API_URL + '/tables')
            .then(res => res.json())
            .then(tables => {
                dispatch(updateTables(tables));
                dispatch(setLoading(false));
            })
            .catch((error) => {
                console.error(error);
                dispatch(setLoading(false));
            });
    };
};

export const editTableRequest = (updatedTable) => {
    return (dispatch, getState) => {
        const { tables } = getState();
        const existingTable = tables.find((table) => table.id === updatedTable.id && table.status === "Busy");


        if (existingTable && updatedTable.status !== "Busy") {
            updatedTable.bill = 0;
        }

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTable),
        };

        fetch(API_URL + '/tables/' + updatedTable.id, options)
            .then(() => dispatch(editTable(updatedTable)))
    }
};

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
        return [...action.payload];

    case EDIT_TABLE:
        return statePart.map((table) =>
            (table.id === action.payload.id ? { ...table, ...action.payload } : table));

    default:
      return statePart;
  };
};
export default tablesReducer;