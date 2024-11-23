import React from "react";
import AppointmentForm from "./AppointmentForm";
import ViewAppointmentSchedule from "./ViewAppointmentSchedule";
import APPointmentList from "./APPointmentList";

function AppointmentManagement() {
    return (
        <div>
            <AppointmentForm />
            <ViewAppointmentSchedule />
            <APPointmentList />
        </div>
    );
}

export default AppointmentManagement;
