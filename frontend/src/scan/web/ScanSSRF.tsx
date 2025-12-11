import React, { useState } from "react";
import { Box, TextField, Button, Typography, Card, CardContent } from "@mui/material";
import { runSSRFScan } from '../../services/scan/webScanServices';

const ScanSSRF: React.FC = () => {
    const [url, setUrl] = useState("");
    const [cookie, setCookie] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const res = await runSSRFScan(url, cookie);
            setResult(res.data);
        } catch (err) {
            setResult({ error: "Erreur lors du scan." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box maxWidth={600} mx="auto" mt={3}>
            <Typography variant="h5" mb={2}>Scan SSRF</Typography>

            <Card>
                <CardContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField
                            label="Target URL"
                            required
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />

                        <TextField
                            label="Cookie (optionnel)"
                            value={cookie}
                            onChange={(e) => setCookie(e.target.value)}
                        />

                        <Button type="submit" variant="contained" disabled={loading || !url}>
                            {loading ? "Scan en cours..." : "Lancer le scan"}
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            {result && (
                <Card sx={{ mt: 3 }}>
                    <CardContent>
                        <Typography variant="h6">Résultat :</Typography>
                        <pre style={{ marginTop: 10 }}>
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default ScanSSRF;
