import React, { useMemo, useState, useEffect } from 'react'
import { useTable } from 'react-table'
import { COLUMNS } from './columns'
import axios from 'axios'
import './table.css'

export const BasicTable = () => {

    const [POSTS, setPost] = useState([])
    const [search, setSearch] = useState('react')
    const [searchFromButtonClick, setSearchFromButtonClick] = useState('')

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => POSTS, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data
    })

    const handleClick = () => {
        setSearchFromButtonClick(search)
    }

    useEffect(() => {
        axios
            .get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyAQyAHsbuTgTIKQ5MVGrLMCZ4uIg8u21-A`)
            .then(response => {
                console.log(response)
                setPost(response.data.items)
                console.log(response.data.items[0].volumeInfo.title)
            })
            .catch(err => {
                console.log(err)
            })
    }, [searchFromButtonClick])

    return (
        <div>

            <input type='text' value={search} onChange={e => setSearch(e.target.value)} />
            <button type='button' onClick={handleClick}>Search</button>

            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))
                            }
                        </tr>
                    ))}

                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr{...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
        </div>
    )
}

export default BasicTable