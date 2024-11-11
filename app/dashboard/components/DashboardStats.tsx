import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign } from 'lucide-react'
import React, { ReactNode } from 'react'

interface StatsProps {
    title: string
    amount: number
    progress: string
    icon: ReactNode
}

const DashboardStats = ({ title, amount, progress, icon }: StatsProps) => {
    return (
        <Card className="bg-gradient-to-br from-blue-400 to-blue-500 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className="h-4 w-4 text-purple-100">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{amount} FCFA</div>
                <p className="text-xs text-purple-100">{progress} </p>
            </CardContent>
        </Card>
    )
}

export default DashboardStats
