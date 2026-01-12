'use client'

import { Box, Container, Paper, Typography, useTheme } from '@mui/material'

const TermsConditionsPage = () => {
    const theme = useTheme()

    return (
        <Container maxWidth='lg' className="py-10">
            <Paper elevation={3} className="p-8 md:p-12 rounded-xl">
                <Typography variant='h3' component='h1' className="mb-8 font-bold text-center text-primary">
                    Términos de servicio
                </Typography>

                <Box className="flex flex-col gap-6 text-justify">
                    <Typography variant='body1'>
                        Al utilizar nuestros sitios web operativos (RTMS) o sus servicios (el "Sitio" o el "Servicio"), usted acepta regirse por estos Términos de Uso del sitio web, todas las leyes y regulaciones aplicables, y acepta ser responsable del cumplimiento de las leyes locales aplicables. Si no está de acuerdo con alguno de estos términos, tiene prohibido usar o acceder a este sitio. Los materiales contenidos en este sitio web están protegidos por las leyes aplicables de derechos de autor y marcas registradas.
                    </Typography>

                    <section>
                        <Typography variant='h5' component='h2' className="mb-4 font-semibold">
                            DERECHOS DE PROPIEDAD INTELECTUAL:
                        </Typography>
                        <Typography variant='body1' paragraph>
                            Este Servicio o cualquier parte del mismo no puede reproducirse, duplicarse, copiarse, venderse, revenderse, visitarse ni explotarse de ningún otro modo con fines comerciales sin el consentimiento expreso por escrito de nuestros sitios web operativos (RTMS). No puede enmarcar ni utilizar técnicas de enmarcado para encerrar ninguna marca comercial, logotipo u otra información de propiedad (incluidas imágenes, texto, diseño de página o forma) de nuestros sitios web operativos (RTMS) sin consentimiento expreso por escrito. No podrá utilizar metaetiquetas ni ningún otro "texto oculto" en nuestros sitios web operativos (RTMS) nombre o marcas comerciales sin el consentimiento expreso por escrito de nuestros sitios web operativos (RTMS).
                        </Typography>
                        <Typography variant='body1'>
                            No podrá (directa ni indirectamente) descifrar, descompilar, desensamblar, aplicar ingeniería inversa ni intentar de otro modo derivar el código fuente, las ideas o algoritmos subyacentes de ninguna parte del Servicio, ni modificar, traducir ni crear obras derivadas de ninguna parte del Servicio. Cualquier modificación del contenido, o parte del mismo, o su uso para cualquier otro fin constituye una infracción de los derechos de marca registrada u otros derechos de propiedad de nuestros sitios web operativos (RTMS) o de terceros, y cualquier uso no autorizado termina el permiso para usar el Servicio otorgado por nuestros sitios web operativos (RTMS).
                        </Typography>
                    </section>

                    <section>
                        <Typography variant='h5' component='h2' className="mb-4 font-semibold">
                            CUENTA DE USUARIO:
                        </Typography>
                        <Typography variant='body1'>
                            Para crear su Cuenta, puede registrarse en nuestros sitios web operativos (RTMS) a través de su cuenta en ciertas redes sociales de terceros, como Facebook (en conjunto, «SNS»). Al registrarse a través de su cuenta de SNS, se le solicitará que inicie sesión en el Servicio con las credenciales de su cuenta. Al crear una cuenta a través de su cuenta de SNS, permite que nuestros sitios web operativos (RTMS) para acceder a la información de su cuenta de redes sociales y usted acepta cumplir con los términos y condiciones aplicables de su red social al usar el Servicio a través de dicha red. Tiene la opción de desactivar la conexión entre sus sitios web operativos (RTMS) Cuenta y cuenta SNS en cualquier momento accediendo a la cuenta SNS y desconectando el acceso al Servicio.
                        </Typography>
                    </section>

                    <section>
                        <Typography variant='h5' component='h2' className="mb-4 font-semibold">
                            CONTENIDO DEL USUARIO:
                        </Typography>
                        <Typography variant='body1' paragraph>
                            Al contribuir con contenido (incluidas, entre otras, publicaciones) a nuestros sitios web operativos (RTMS), usted reconoce y acepta los siguientes términos y nuestra Política de Privacidad. Solo debe contribuir con Contenido si se siente cómodo con estos términos:
                        </Typography>
                        <ul className="list-disc pl-6 space-y-2">
                            <li className="MuiTypography-body1">Su Contenido será visible públicamente en todo el Servicio.</li>
                            <li className="MuiTypography-body1">Su Contenido, incluida la información de su cuenta pública, como su nombre para mostrar o foto de perfil, puede ser indexado por motores de búsqueda de terceros, como Google, que pueden no eliminarlo de inmediato (o nunca), incluso si se elimina de nuestro sitio web operativo (RTMS) Servicio.</li>
                            <li className="MuiTypography-body1">Su Contenido puede estar licenciado a terceros que hayan aceptado los Términos de Servicio de la API, o que de otra manera lo hayan licenciado desde nuestros sitios web operativos (RTMS), como se describe en nuestra Política de privacidad.</li>
                            <li className="MuiTypography-body1">Aportarás fotos e información precisa. El contenido inexacto, ofensivo, indecente, objetable o inapropiado podrá ser marcado y eliminado sin previo aviso.</li>
                            <li className="MuiTypography-body1">Todo el contenido publicado en el Servicio debe cumplir con todas las leyes aplicables.</li>
                            <li className="MuiTypography-body1">Usted será el único responsable de su contenido y conducta en nuestros sitios web operativos (RTMS) Servicio. Nuestros sitios web operativos (RTMS) no será responsable del uso que nuestros sitios web operativos hagan de su Contenido (RTMS) de conformidad con estos Términos. Usted declara y garantiza que posee todos los derechos, facultades y autoridad necesarios para otorgar los derechos aquí otorgados a cualquier Contenido que envíe.</li>
                        </ul>
                    </section>

                    <section>
                        <Typography variant='h5' component='h2' className="mb-4 font-semibold">
                            USO PERMITIDO DEL SERVICIO:
                        </Typography>
                        <Typography variant='body1' paragraph>
                            Nuestros sitios web operativos (RTMS) permite a los Usuarios acceder y usar este Servicio para fines personales, incluyendo, entre otros, la creación y/o gestión de perfiles de jugadores, equipos, partidos y torneos a través del Sitio Web o de las aplicaciones. Los Usuarios no pueden modificar el Servicio, ni ninguna parte del mismo, salvo con el consentimiento expreso por escrito de nuestros sitios web operativos (RTMS). Usted acepta no utilizar ni intentar utilizar este Servicio para ningún otro fin que no sea la creación y gestión de perfiles de jugadores, equipos deportivos, partidos y torneos.
                        </Typography>
                        <Typography variant='body1'>
                            No podrá (ni permitirá que ningún tercero) utilizar ni intentar utilizar este Servicio, ni cargar, descargar, publicar, enviar ni distribuir ni facilitar la distribución de contenido en o a través del Servicio para ningún fin:
                        </Typography>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li className="MuiTypography-body1">que transmita cualquier publicidad, solicitud, esquema, spam, inundación u otro spam no solicitado o correo electrónico masivo (incluidas, entre otras, publicaciones en servicios de redes sociales de terceros vinculados al Servicio) o comunicaciones comerciales no solicitadas,</li>
                            <li className="MuiTypography-body1">que transmita códigos, archivos, programas o virus informáticos dañinos o incapacitantes,</li>
                            <li className="MuiTypography-body1">que recopila direcciones de correo electrónico o información de identificación personal de nuestros sitios web operativos (RTMS),</li>
                            <li className="MuiTypography-body1">que interfiera con nuestros servicios de red o el correcto funcionamiento del Servicio o las actividades realizadas en el Servicio,</li>
                            <li className="MuiTypography-body1">que utiliza software manual o automatizado u otros procesos para “rastrear”, “arañar”, indexar o de cualquier manera no transitoria almacenar o almacenar en caché información obtenida de cualquier página del Servicio,</li>
                            <li className="MuiTypography-body1">que intente obtener acceso no autorizado a nuestro Servicio, incluyendo eludir las medidas que podamos utilizar para prevenir o restringir el acceso al Servicio (u otras cuentas, sistemas informáticos o redes conectadas al Servicio),</li>
                            <li className="MuiTypography-body1">que sugiera una afiliación expresa o implícita con nuestros sitios web operativos (RTMS) sin el permiso expreso por escrito de nuestros sitios web operativos (RTMS) o que se haga pasar por cualquier persona o entidad, incluido un empleado o representante de nuestros sitios web operativos (RTMS),</li>
                            <li className="MuiTypography-body1">que perjudique o limite nuestra capacidad para operar este Servicio o la capacidad de cualquier otra persona para acceder y utilizar este Servicio.</li>
                        </ul>
                    </section>

                    <section>
                        <Typography variant='h5' component='h2' className="mb-4 font-semibold">
                            DESHABILITACIÓN DE SU CUENTA Y SU CONTENIDO:
                        </Typography>
                        <Typography variant='body1'>
                            Puede desactivar su Cuenta en cualquier momento a través del Servicio. Si desactiva su Cuenta, haremos todo lo posible, dentro de lo comercialmente razonable, para dejar de mostrar la información pública de la Cuenta en todo el Servicio. Desactivar su Cuenta anonimiza su Contenido, pero no lo elimina automáticamente. Dado que otros sitios web operativos (RTMS) los usuarios pueden haber actuado sobre su Contenido, es posible que no pueda eliminar ni editar su Contenido una vez que lo haya contribuido a nuestros sitios web operativos (RTMS). Hemos realizado esfuerzos razonables para permitirle eliminar su Contenido y deshabilitar su Cuenta, lo que disocia su Contenido de su Cuenta, pero no podemos garantizar la eliminación completa.
                        </Typography>
                    </section>

                    <section>
                        <Typography variant='h5' component='h2' className="mb-4 font-semibold">
                            POLÍTICA DE REEMBOLSO:
                        </Typography>
                        <Typography variant='body1'>
                            Consulte nuestra página de política de reembolsos para obtener información sobre los reembolsos.
                        </Typography>
                    </section>

                    <section>
                        <Typography variant='h5' component='h2' className="mb-4 font-semibold">
                            SITIOS WEB DE TERCEROS:
                        </Typography>
                        <Typography variant='body1'>
                            A menos que se indique expresamente lo contrario, nuestros sitios web operativos (RTMS) no respalda, aprueba, patrocina ni controla, y no somos responsables en modo alguno de, el contenido, los servicios, los cálculos, la información, los productos ni los materiales disponibles en o a través de los sitios web a los que este Servicio pueda proporcionar un enlace. Al utilizar el Servicio, usted reconoce y acepta que nuestros sitios web operativos (RTMS) no será responsable ante usted ni ante ninguna otra persona por ningún daño o reclamación que pueda derivarse del uso de dicho contenido, servicios, cálculos, información, productos o materiales. Le recomendamos revisar atentamente las declaraciones de privacidad y las condiciones de uso de cada sitio web para comprender sus derechos y responsabilidades.
                        </Typography>
                    </section>

                    <section>
                        <Typography variant='h5' component='h2' className="mb-4 font-semibold">
                            DESCARGO DE RESPONSABILIDAD Y LIMITACIÓN DE RESPONSABILIDAD:
                        </Typography>
                        <Typography variant='body1' className="uppercase">
                            EL SERVICIO ES PROPORCIONADO POR NUESTROS SITIOS WEB OPERATIVOS (RTMS) "TAL CUAL" Y "SEGÚN DISPONIBILIDAD". NUESTROS SITIOS WEB OPERATIVOS (RTMS) NO HACE REPRESENTACIONES NI GARANTÍAS DE NINGÚN TIPO, EXPRESAS O IMPLÍCITAS, GARANTÍAS IMPLÍCITAS DE COMERCIABILIDAD O IDONEIDAD PARA UN PROPÓSITO PARTICULAR.
                        </Typography>
                        <Typography variant='body1' className="uppercase mt-4">
                            USTED ACEPTA QUE BAJO NINGUNA CIRCUNSTANCIA NUESTROS SITIOS WEB OPERATIVOS (RTMS) SERÁ RESPONSABLE ANTE USTED O CUALQUIER OTRA PERSONA O ENTIDAD POR CUALQUIER DAÑO ESPECIAL, INCIDENTAL, CONSECUENTE, PUNITIVO U OTROS DAÑOS INDIRECTOS QUE RESULTEN DEL USO O LA INCAPACIDAD DE USAR EL SERVICIO O LA INFORMACIÓN CONTENIDA EN EL SERVICIO.
                        </Typography>
                    </section>

                    <section>
                        <Typography variant='h5' component='h2' className="mb-4 font-semibold">
                            TERMINACIÓN:
                        </Typography>
                        <Typography variant='body1'>
                            Nuestros sitios web operativos (RTMS) podrá, a su entera discreción, cancelar o suspender su acceso a la totalidad o parte del Servicio, por cualquier motivo, incluyendo, entre otros, el incumplimiento de estos Términos por su parte, a su entera discreción y sin previo aviso. En caso de rescisión de estos Términos, las restricciones sobre el contenido que aparece en el Servicio, así como las declaraciones, garantías, indemnizaciones y limitaciones de responsabilidad establecidas en estos Términos, seguirán vigentes tras la rescisión.
                        </Typography>
                    </section>

                    <section>
                        <Typography variant='h5' component='h2' className="mb-4 font-semibold">
                            MODIFICACIÓN DE LAS CONDICIONES DE USO:
                        </Typography>
                        <Typography variant='body1'>
                            Nuestros sitios web operativos (RTMS) se reserva el derecho de cambiar, modificar, añadir o eliminar partes de las Condiciones de Uso en cualquier momento, sin previo aviso. Por favor, revise las Condiciones de Uso periódicamente para estar al tanto de los cambios. Su uso continuado del Sitio implicará que acepta dichos cambios o eliminaciones.
                        </Typography>
                    </section>
                </Box>
            </Paper>
        </Container>
    )
}

export default TermsConditionsPage
