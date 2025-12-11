import React from 'react'
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material'


interface CategoryCardProps {
  title: string;
  desc: string;
  onStart: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, desc, onStart }) => {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>{desc}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={onStart}>Start</Button>
            </CardActions>
        </Card>
    )
}

export default CategoryCard