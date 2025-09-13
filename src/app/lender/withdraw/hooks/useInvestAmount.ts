import { useState, useEffect } from "react";
import { useInvestAmountStore } from "../store/useInvestAmountStore";

export const useInvestAmount = () => {
  const { amount, setAmount } = useInvestAmountStore();
  const commissionRate = 0.005;
  const [commission, setCommission] = useState("0");
  const [totalIncome, setTotalIncome] = useState("0");

  useEffect(() => {
    // Remover puntos (separadores de miles) y comas, luego convertir a número
    const cleanAmount = amount.replace(/\./g, "").replace(/,/g, "");
    const numericAmount = Number(cleanAmount) || 0;

    // Calcular comisión
    const commissionValue = numericAmount * commissionRate;

    // Calcular total después de comisión
    const total = numericAmount - commissionValue;

    // Formatear para mostrar
    setCommission(commissionValue.toLocaleString("es-CO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }));

    setTotalIncome(total.toLocaleString("es-CO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }));
  }, [amount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Permitir solo números y puntos (para formato colombiano)
    const cleanedValue = value.replace(/[^\d.]/g, "");

    // Si es un número válido, formatearlo
    const numericValue = Number(cleanedValue.replace(/\./g, ""));

    if (!isNaN(numericValue)) {
      // Formatear con separadores de miles
      setAmount(numericValue.toLocaleString("es-CO"));
    } else if (value === "") {
      setAmount("");
    }
  };

  const handleSelectAmount = (value: number | "all") => {
    if (value === "all") {
      setAmount("123.456");
    } else {
      setAmount(value.toLocaleString("es-CO"));
    }
  };

  return {
    amount,
    setAmount,
    handleChange,
    handleSelectAmount,
    commission,
    totalIncome,
  };
};