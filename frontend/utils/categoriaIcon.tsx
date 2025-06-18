import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';

export const categoriaIconMap: Record<string, React.ReactNode> = {
    'Alimentación': <Ionicons name="fast-food-outline" size={24} color="#34D399" />,
    'Transporte': <Ionicons name="car-outline" size={24} color="#60A5FA" />,
    'Vivienda': <MaterialCommunityIcons name="home-city-outline" size={24} color="#F59E0B" />,
    'Servicios': <Ionicons name="flash-outline" size={24} color="#FBBF24" />,
    'Educación': <Ionicons name="school-outline" size={24} color="#38BDF8" />,
    'Salud': <FontAwesome5 name="briefcase-medical" size={22} color="#EF4444" />,
    'Entretenimiento': <MaterialCommunityIcons name="movie-open-outline" size={24} color="#A78BFA" />,
    'Ropa y calzado': <Ionicons name="shirt-outline" size={24} color="#EC4899" />,
    'Ahorro e inversión': <Ionicons name="wallet-outline" size={24} color="#10B981" />,
    'Deudas / préstamos': <MaterialCommunityIcons name="credit-card-clock-outline" size={24} color="#F43F5E" />,
    'Mascotas': <MaterialCommunityIcons name="dog-side" size={24} color="#F97316" />,
    'Tecnología': <Ionicons name="laptop-outline" size={24} color="#3B82F6" />,
    'Viajes': <MaterialCommunityIcons name="airplane" size={24} color="#06B6D4" />,
    'Regalos': <Ionicons name="gift-outline" size={24} color="#F472B6" />,
    'Otros': <Ionicons name="ellipsis-horizontal-outline" size={24} color="#9CA3AF" />,
};
