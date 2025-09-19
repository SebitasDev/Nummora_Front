import { CustomCard } from "@/components/atoms/CustomCard";
import { ScheduledPaymentCard } from "./ScheduledPaymentCard";
import SectionHeader from "@/components/atoms/SectionHeader";

interface PaymentScheduleListProps {
  payments: {
    quotaNumber: string;
    date: string;
    value: string;
  }[];
}

export const PaymentScheduleList = ({ payments }: PaymentScheduleListProps) => {
  return (
    <CustomCard display="flex" flexDirection="column" gap={3} p={3}>
      <SectionHeader
        title="Cronograma de Pagos"
        subtitle="Proximos pagos programados"
      />
      {payments.map((payment) => (
        <ScheduledPaymentCard
          key={payment.quotaNumber}
          quotaNumber={payment.quotaNumber}
          date={payment.date}
          value={payment.value}
        />
      ))}
    </CustomCard>
  );
};
