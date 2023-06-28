"use client";

import { userValidation } from "@/components/userValidation";
import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  useEffect(() => {
    userValidation(localStorage);

    const fetchOrders = async () => {
      try {
        const request = await fetch("http://localhost:3005/user/orders?page=1", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const { orders, totalPages, hasNextPage, hasPreviousPage } = await request.json();

        setOrders(orders);
        setCurrentPage(1);
        setTotalPages(totalPages);
        setHasNextPage(hasNextPage);
        setHasPreviousPage(hasPreviousPage);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchOrdersPerPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      fetchOrdersPerPage(currentPage - 1);
    }
  };

  const fetchOrdersPerPage = async (page: number) => {
    try {
      const request = await fetch(`http://localhost:3005/user/orders?page=${page}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const { orders, hasNextPage, hasPreviousPage } = await request.json();

      setOrders(orders);
      setCurrentPage(page);
      setHasNextPage(hasNextPage);
      setHasPreviousPage(hasPreviousPage);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-start">
      <div className="overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr>
              <th className="text-xl">Звідки</th>
              <th className="text-xl">Куди</th>
              <th className="text-xl">Вага (тонн)</th>
              <th className="text-xl">Контактна особа</th>
              <th className="text-xl">Номер телефону</th>
              <th className="text-xl">Заявку створено</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(
              (order: {
                from: string;
                to: string;
                weight: number;
                fullName: string;
                phone: string;
                createdAt: string;
              }) => (
                <tr>
                  <td>{order.from}</td>
                  <td>{order.to}</td>
                  <td>{order.weight}</td>
                  <td>{order.fullName}</td>
                  <td>{order.phone}</td>
                  <td>{new Date(order.createdAt).toLocaleString("uk-UA")}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-around my-10">
        <button
          className={`btn ${!hasPreviousPage ? "btn-disabled" : "btn-ghost"} rounded-box hover:btn-warning`}
          onClick={handlePreviousPage}
          disabled={!hasPreviousPage}
        >
          Попередня сторінка
        </button>

        <button
          className={`btn ${!hasNextPage ? "btn-disabled" : "btn-ghost"} rounded-box hover:btn-warning`}
          onClick={handleNextPage}
          disabled={!hasNextPage}
        >
          Наступна сторінка
        </button>
      </div>
    </div>
  );
}
