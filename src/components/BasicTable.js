import React, { useMemo, useState, useEffect } from 'react'
import { useTable, useRowSelect } from 'react-table'
import { COLUMNS } from './columns'
import { APIKey } from './APIKey'
import { Checkbox } from './Checkbox'
import axios from 'axios'
import './table.css'

export const BasicTable = () => {
    let [posts, setPost] = useState([])
    const [search, setSearch] = useState('react')
    const [searchFromButtonClick, setSearchFromButtonClick] = useState('')

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => posts, [posts])

    useEffect(() => {
        axios
            .get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${APIKey}`)

            .then(response => {
                setPost(response.data.items)
                
            })
            .catch(err => {
                console.log(err)
            })
    }, [searchFromButtonClick])

    const handleSearch = () => setSearchFromButtonClick(search)

    let {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
    } = useTable({
        columns,
        data
    }, useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <Checkbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({ row }) => (
                            <Checkbox {...row.getToggleRowSelectedProps()} />
                        )
                    },
                    ...columns,

                    {
                        id: 'details',
                        Header: 'Details',
                        Footer: 'Details',
                        Cell: ({ row }) => (
                            <button type='button' id={row.values.id} value={row.id} onClick={handleDetails}>More details</button>
                        )
                    },

                ]
            })
        }
    )

    const [display, setDisplay] = useState('none')
    const [id, setId] = useState([])

    const handleDetails = (event) => {
        setDisplay('details')
        setId(event.currentTarget.id)
    }
    
    const handleClosing = () => {
        setDisplay('none')
    }

    const imgsrc = `http://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`

    return (
        <div>
            <div className={display}>
                <div id='display-details'>
                    <img src={imgsrc} alt="Italian Trulli"></img>
                    {/* <iframe src="https://" title=""></iframe> */}
                    <div>{id}</div>
                    
                </div>
                <button type='button' onClick={handleClosing}> X </button>
            </div>

            <h3>What book you are looking for?</h3>
            <input type='text' value={search} onChange={e => setSearch(e.target.value)} />
            <button type='button' onClick={handleSearch}>Search</button>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')} </th>))
                            }
                        </tr>
                    ))}

                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr{...row.getRowProps()} key={row.index}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')} </td>
                                })}
                                
                            </tr>
                        )

                    })
                    }

                </tbody>
                <tfoot>
                    {
                        footerGroups.map(footerGroup => (
                            <tr {...footerGroup.getFooterGroupProps()}>
                                {
                                    footerGroup.headers.map(column => (
                                        <td {...column.getFooterProps}>
                                            {
                                                column.render('Footer')
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tfoot>
            </table>

            <pre>
                <code>
                    {JSON.stringify(
                        {
                            selectedFlatRows: selectedFlatRows.map((row) => row.original),
                        },
                        null,
                        2
                    )}
                </code>
            </pre>
        </div>
    )
}

export default BasicTable