import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

function Productsdetails() {
    const [apidata, setApidata] = useState([])
    const [loading, setLoading] = useState(false)
    const { id } = useParams();
    const apifetch = useCallback(async () => {
        setLoading(true)
        try {
            let result = await axios.get(`https://products-api-cwck.onrender.com/products/${id}`);
            console.log(result?.data);
            setApidata(result?.data); 
            setLoading(false)
        } catch (error) {
            console.log(error.message)
        }
    }, [])

    
  const generatePdf = () => {
    if (!apidata) {
      console.error('No data available for PDF generation');
      return;
    }
    const doc = new jsPDF();
    const columns = Object.keys(apidata);
    console.log(columns)
    const rows =  Object.values(apidata);
    // const rows = apidata.map((data) => Object.values(data));
    console.log(rows)

    // Add table to PDF
    doc.autoTable({
      head: [columns],
      body: rows,
    });

    doc.save('generated-pdf-with-table.pdf');
  };

    useEffect(() => {
        apifetch();
    }, [apifetch])
    return (
        <>
            <div className='row'>
                {
                    loading ? <h1>Loading....</h1> :
                            <div key={apidata.id + 1} className='card-items mb-5'>
                                <div className='card-shadow'>
                                    <div className='imaage_parent'>
                                        <img src={apidata.thumbnail}></img>
                                    </div>
                                </div>
                                <button type='button' className='btn btn-success w-100 mt-2' onClick={() => generatePdf()} >Pdf</button>
                            </div>
                }
            </div>
        </>
    )
}

export default Productsdetails