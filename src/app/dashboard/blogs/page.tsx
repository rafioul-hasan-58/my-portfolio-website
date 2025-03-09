'use client';
import { IPortfolio } from "@/src/types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AllBlogs = () => {
    const [blogData, setBlogs] = useState([]);
    const fetchBlogs = async () => {
        const res = await fetch(`https://my-fifth-assignment-server.vercel.app/get-all-blogs`, { cache: 'no-store' });
        const data = await res.json();
        setBlogs(data?.data);
    };
    useEffect(() => {
        fetchBlogs();
    }, []);
    const deleteBlog = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`https://my-fifth-assignment-server.vercel.app/delete-blog/${id}`)
                fetchBlogs()
                Swal.fire({
                    title: "Deleted!",
                    text: "Your blog has been deleted.",
                    icon: "success"
                });
            }

        });
    }
    return (
        <div>
            <div>
                <h1 className="text-3xl text-center font-bold text-[#FF0050] mt-10">All Blogs</h1>
                <section className="container px-4 mx-auto mt-5">
                    <div className="flex flex-col">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200 ">
                                        <thead className="bg-[#FF0050] ">
                                            <tr>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white ">
                                                    Image
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white ">
                                                    Title
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white ">
                                                    Update
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white ">
                                                    Delete
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 ">
                                            {
                                                blogData?.map((item: IPortfolio) => <tr key={item?._id} className="w-full">
                                                    <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                        <Image src={item.image} alt="image" width={80} height={100} />
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                        {item.title}
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                                        <Link href={`/dashboard/update-blog/${item._id}`}>
                                                            <button className="bg-[#FF0050] text-white p-2 rounded-lg hover:border-[#FF0050]  hover:text-[#FF0005] hover:bg-white">Update</button>
                                                        </Link>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                        <button onClick={() => deleteBlog(item?._id)} className="bg-red-500 text-white p-2 rounded-md hover:bg-purple-400">Delete</button>
                                                    </td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AllBlogs;