$(document).ready(function () {
    let preInscritosJson = [];
    let preInscritosFormData = [];

    const columnsName = [
        { label: "Código de Inscripción", key: "id" },
        { label: "Apellidos y Nombres", key: "name" },
        { label: "DNI", key: "dni" },
        { label: "Teléfono", key: "telefono" },
        { label: "Departamento", key: "departamento" },
        { label: "Provincia", key: "provincia" },
        { label: "Distrito", key: "distrito" },
        { label: "Colegio", key: "colegio" },
        { label: "Nivel", key: "nivel" },
        { label: "Grado", key: "grado" },
        { label: "Código de Pago", key: "cod_pago" },
        { label: "Fecha y Hora de Pago", key: "fecha_pago" },
        { label: "Voucher", key: "imagen" },
    ];

    $("#modal-recibo").modal("show");

    async function exportPDF(data) {
        // Crea una nueva instancia de jsPDF
        let doc = new jsPDF();

        // Crear un cuadro de color azul que cubre el ancho de la página
        doc.setFillColor(0, 123, 255); // Color azul
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), 40, "F");

        const img64 =
            "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAX8AAACFCAYAAACzOvisAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAgAElEQVR4nOy9eXhc13Xg+bv3LbUXChsJkAQJgotIarFESY4iL7IjypEdx3ZsyVlnOj1pW5PJJN3fxBbjSXrS7nS6R7KTfOl8HcfKTKfT6WTakZ1JMmlbsmi7vcqxJMqWZEncd3ADsdf2lnvmj/cKKBQBECwCFEW9ny0JVfXefffdenXuueeeBRISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISrhWs17oDK8nAA7+ZXvPu3f/b6h//td/P9Q1sSeUy3y2fOui91v1ajM3/06c/ULrxxz6S6eotTh196eXXuj8JCQnXJ/Zr3YGVYO37PrY+d8OuX3BTne901gxulWJ6Tal31fpc3+077M7Nj08f2PNfJg69Yl7rfjZY+5b3rSne/gs/ZpU2/7jd3b1TqmcRb+z8a92vhISE65e2hP/2f/38B4Oz+10C/7j45cPemedHjn/xT4Ll7tzlsPY9v5LPrr3zzXa2581OR/FOu2/orVNmzaoxpaAKdqbYl96+4b29PfmthcE3vW31ffmvlA9/58unvvzvR1+L/q57x0+t6njTg2+W4uZbx0aG3zTcseOmUu+GbX39Low4I1NWLvNa9CshIeGNQVvC3852/ra9emMp8IP9fs172VHuicGfGTqYXrvtDMiod+HYaOhXxo/95W+s2ISw4UO/bmunYw1O1xpvdHhdfuO2m53ude+ie+ddXr6DsoBfh+1FYTAvDFcUL4Qas+merdbAPVvdsyfuV6Zy28af/T+/bXWuHw4nTh8/8pe/fm6l+rvug/97Nj90d1+2/4a+sef+drCu3dvHMgPv0sWhmzIb72SoCPk01Hw4P1qpBNPl8kr1JSEhIUG1c9IdfxpecIq6qx5CZRrwgOoFTPnEq6Zydq+ZuvAifuVlq9D1qlNYPW3qgadStlc9uTcY/er/HfS+73dNqrfLvPwv717U9LL9d5/Vp//qN3W6f6PdcdeHXTvd7VIbs4Pa+Wxw/sgtKOded80du9z+H9lmlRwkA1NTMD0KHS68ecDwT28zvG294R9Pwx981+LZUxaegkIG8ikIx6apHvnKs1Ie/7vy0ae/4fbfeDS78e6Kf/bVWnX/N4PCXf8keOXf3L3kSWz7b39L1w7uta18xs1uuNsd+8an0v70aJ87dO+t7ppbftTt3vgOcddsrroOgQs9Wbi1G37+hgpnfZv/Z5/L0986eDz7/Gf+8OQTv//77Xw/CQkJCZeiLc3fr05NK8l1pVI2ODAuUKYLP925NdUrm/Nh8EA6qAVah+fCySMjUh17FbH2IXJUTHBYkEmE6cH3/tL49ItP1nShT2NClNaY8oXA7lrrFu78cB4hjwmzYsJBRLYh4Q0otTXd/5ZBe+O7u6yc4/qupcenLC4MgwbWdxnec6vw3k2au9ZA1lZYwF19wmfeE/LVk8ITr1rsOaQ4dg56izn67njvTu3JLcUbP2DqEydPBuUz3xExz4kJ9yNycsuv/sfxYPzcyJG/+I3aQmOyavu2fOf9v55HJIvIeiS8SUJvU+nOh+5W6VVb64WB7Dhalz2t845ia6fwtjUh9w0abuvT5GzDnmHwQqiHYjJyzWxJJCQkXIe0pfnv+PTIEd8tDr7vFocPbAvxfcXe85pXxuDQeTg1DhMe+AH4YcW4Oqhkta6k/IqXCs7X0rm1AVL3gpGD0+HE+ZpyUrYgRqGQsG60m7HtzvV5XehPS/2sxkqnVborG1hWuhaE2aqXsycDjQ/kUtCfgx0dcPdAyJ1rQwY6FN1pTcoKEVEYsbAUoAzlQBitaPaeF548rHn6lOb4JHh1cDSU0j4dTnXaMf50WJmqWOluL6yOBvWRE2dMaB13O/s8O18yIiGgjAQhwejxolRODTmrtxZVbrVdq/luOdD5aTuXrmu7aNuu7nJhoAjbukLuHoTbVgmr04ZSClxLA4onT2g+vVfx9NMHjpd+8Jk/PPXEHySaf0JCworQluYfhF5QNcKaIrx1tQCaW3rhfDXg/LThdFlzaNLi5DgMl7P6Qp38WJn8tJdnyl3F2UkwgcHp7sFapQEBpUCI/hYwPkhVYxVKBAFIFRwLMilIZ2BdWtjYCTevEm7phYG8YkNJKLiaaA2gEAQDKKUQFEoUOVvIFRUDxZCbe0NePm947qzm1QuK01NwtupwuubkA5+8srpR02CpAvaqnpuUmQ6QXIDnYkQwIkbQSKnkSu9ttu+Bqlukc5C3oTcFvUXY1gO3doVsLIT052CgZJHSillPWwXo6PYTEhISrgJtunoGGCUYgRCFhaI7Bd0pxbaSAIaagTNTIWen4GzF5mxZc6oMw9PChQ5F2dNUgJqGMFSEIRgBUdFiRAs4xAI/DaUcrE7DmhR0p0MGCorNXbC5S3CAhgCN/qtiQRpr/PECR1ComcWOxVAxZKho+LEhODxhODmueGXU4qUpzTkfagFM1qFSA1E5FDk7LGObGkgIWoPlgJOCdApSAiUbBoqGzV3QnxPWFIRN3dA/47vTPDnBbO9mup6QkJCw4rQn/FUkQiPh3xwppkFcQEhrw2CHYbADiPRvAEa8kMmyZnRacboKoz74oeD7ECqNUQplgZuGXBayKejugH5X6AOKCNESYVZKzgr12fdU079l5qjoPYn/G4pGI2SVcFPJcFNJc/+gMIrHWULGjWa4CucmLCYmbLxY6OODDsDRQioj5Fyh5ChWZ4XVWWGgYMi5Dc0+iPthIcaOFjiqtbfNfQZJlgAJCQkrzDIEec2ILBCFSMN6o1DiECiFKMFSBgvocTU9rmKosyHhGpowTe00t18DpmF6CiZDsHNI92qwNCJg4v+5SuLXala/VwoxYAhBCzYKjMJoHV3DCCFgtIVlHMQC5U3TdWIfXSdPQjoHKQs6CjCwBnKrmJnqZlYUTfePIRL2GrAIxRCGBktZWEpjRFAIWs2dvBISEhKuNu0Jf2PMxeqpiv6viEVvJPwwIVao0RpCCwSNIfLAsZgVmao+TbjvVcJDRzEHj2IOH0GdO4dVL0NtGnPmLAaN3HsvqX/1OzidnWgFShQ6UIRKEKXxLY2SEDeog1J4ykEJ2CZaWYRaYQOCoJVGKQVKo1S0hqmfOkP9j/8T6vG/Ias0RitI26iuTujpw3R1Yg1tgK1DWDfdgrrxNgJsBIWDDdiEROsLZUIspdBag1JoUZeU+YnlJyEh4WrQvuYfSym1gKgSYvu9trAsPfNeI7GOnDxBZd9+gv37cA4cQB08SDg6ghmbRI9PoCcmUNUKvjHouKMKqK8bwPh+3Ei0UWwcizA+xgJQFuJkkdDDkhARm9C2QEUTjQ9YSjXmKxRNew1VH33sHHJimGgrO9LlQ45Ex6VdTEcBVeqg3ttLuHoNsnkT9roB5IZtcPNNmL41gEJbKdzmIZt3qFpNWCQbvwkJCStOm8J/PvFk5myoztjXlcLHEBw/Rv3ICdSJU6SO7sM6eAS1/yByYD8yMoImEsyNTjWEfewLhAWoTBrlOHOs/sbzqJ06gRw4hG0BdZ9qroC6+WZyXZ1YEhIajV+vY44ewry8H1OtoDdvIr19B7qYjy6qor0AbRSu7cQ90aDjScEYNIKqeQS1C6izF1D7Ds+Mhp/LwuAgcuMOzI4dqG3bYGgLsnYd1pq+i4xb0XkS3Ufs7JRI/oSEhKtFm2Yf3wiCMZEFCK0RNCGxUDYhanQMMz5OeOECwf4fUv/HfyR8+jlSz79IIB4WkAZs2yLs7sHqKkHKhXMjqLFJFBqM4IghFEUoNYwI2pgm7xiFTE8RfOlLyJ88hhASVipUu1fBgw+S/qVfQnd2oi1QY+OEf/+3hJ/+98jEOPILP498/OOo4raoqbjvJvQwQS02SdmESiEqmgO0ERQaZSuM2FgmwDJVfKBSKsH0NPLEk4R//XncXAp5yzuovek27Dt3Ym3dCqUSulRCd3RgEe1PCGAZAUsw8Tpkuc0+IvJR4D7ggZaPHgWeUkrtWeTcofi8h4Chlo93A3uUUnsXOO9Q01v3LeE6hxb6vImHlFKPtZy7E9gFfAIoNX10GPgs8JhSanyeaz4MPNI4Vim1aYG+fRS4Hfhoy0d7iMbv0SX0u7XNz8btXeq6n41fXnTfLceOMXvvjyqldi+hD43vtnXc9gKfW+i+RObYfOft1zI9Nwves4gcittdcPzi45q/Y4DO+Z6Fea4Nl3hmX++0J/wDzwhiDGgxIWjwQwiDgKpXQ/a9QuapPVhf/xb+1/474tVxAVtrlGNTsTL42Sy5wQGs7dsJd9xM+ObbUX29mEf/iPA//xkWCoUb28rjjVkRrCDAQWa0aO35pIbPEu7bj/HqWED+0FH8V19lOpcl8zM/S6qzEx2EqPFxnPNnI9fQ0fPoWlP6HImVfFPDBNV410JjhQ0RrRGlEVE4IVQ1BBLiKAXrN6L+6FOwZTPy8ivI45+HL/wN9pefJPzyk9HKYMMA1bffg9x9N+7b3056wwYsN4VlWahQgRUiyoo8gZZJ+otICfgKsHOBQx4GHhaRhX7ADwCPL3KJR+LjdrcjAJeDFgHZyhBRHz8hIvfOJ2wu0XaJ6P53LXDILmCXiPw08KBS6vDltN/oo4h8dDHBvoR+7mSu8F6ov83nLDZuO4Gd8X3du5CwXKTt5XpudgNtj0vMnS2vdwGfv8I2rwvatfkbZQSxQOzIql374YvU/+Fx5L99CffwCXS1BrUqgedhKRfrTbdgbrkR2boZZ2gLwdbN1Pr7yKbSZF0XcV0sy8Lv65t10FSxMUnbWMZHjMH3DaHMevSjNTrlgKVnzEYu4E5OMv2bv4XXW8J64OcQNwVq9jy/ZQBExdvQnmC8SAdvxAjIjC5uiLasU2RQVMWn2tmB9eBP0XX321ClTrwNW/BXr0WOHMd+5lnEmGgv4sRJrC98Af8f/hthOk31zh/F/umfwnrXPeieATI4aJldgSwTjzAr+PcCH2kIQBHZRfQDLQGfFZFnm4VjrAU1/4Dn/FBbhMcjInJYKbWcP6pLal1xH5sFWGsfG1pfQ4gvqCEuwCPMCtLW8WtcexfRGD9OtDpohysVcne0vN4pIqVLaLiLjdvjRFr7TuBPgQeX2pFlfm6ueGLkYsXnThLhD7Qp/KMNUpBukLOH4T/8CfLlb2AfP0zq9HkcIjFZwyb8jY+Ruude7J5VmK4SqpDHzRfxMmkanvANgecB9YzCATI0RC0zG7NaBFX35khHpRXasWc2bL2t2/GKRazv78UdG2P6X34S2TBI+s67sdYPzfTfBIYwmM2f09hDEC9Aav5MbMDFdw6BNrhhjRSCv2ED8j9/BNXdiwBOxkZtHKT+ppvh+e+jPQ+jXDAGq1LFrlSjlr/0D9RfeYHql+4k/cgjsGZtvLJYHm+fWGttNlPsbhbuSqk9IvLvmF0SPxT/Q9PrBp9v1dCUUo/F12g+/2r/qC7Vx0dF5D4iAT0kIg8sdYKaZ/w+0jJ+h0XkQeAI0eSyU0R2tWkmuKy+zcN8k9piGm7zuO2ZZ9webDIjPSAiQ5exqlnu5+Yh2pwY4+u0mpwuuSp6o9Ce5i++EUuQHMjZM/A3X8D94WE04GCjEQJClG3j3n8/7j33zgg0h0i42UBw4Rz1M2eQ4VMwMoY5dwZ5ag9GRZHDOp4WJN5N0Aacqoeek/RMI1aTT82bbkYefJDga18l9ZnPYL+6n/BTf4T3axqddmc2kJUfooKwqZ2oh8b3MPXI5t/wJpq5bYj3IgKqEuB3d2J/8H2kNt1AOD1Jdfgcbk83TrGD2uYteErhElnxjXJQ2kaHJnJ29T3MgYOY6TL21BSNlc4yMuchX0AoNZtBWn8UzfsDzyxwjWaBsGsxbXOFaO7zQn3c23Tc5Wh9H276e3w+k5FSalxEDjOrXd5HtA/QDlcyec4n0Ba71+bjn1rgmGebjtvF0gXwcj83VzKpzjcui66K3ki0ueEbGpQYAY1oSKdRWmMZF9EuRmpoCbFNHXV+DCsIwbYw9Tre6VP4+/dhHTsKR49iDh/CHDyAPnka50y0asB2CI1CmUj4RvtLEvv0h02JESIXTaP0TNSxnXJQ73wb3HE7/je+SerlH8Lj/y/mwijh+h5sbSEmRAchOjQzGr9q7CKIARPMuoC23LpSYJuAMlB/61vo+LmfJwVMP/U1vO98F/u9PwH3vBW1ZStBOkWmXscSQwBgohVTiI0WwSIk1VnCcqPJa+aay2P3adZ4FtLamt9v1ZCaXy/0Q2l9f4i5E8pK07ykX6iPFxY4/lI029AXK/jT/FnrGF4Ou9oRcrF2O999LabhLmXcmp+N0gLHzMdKPDe7aW9SbbX3N0js/rRt81ezbolagRMFNkGIRYCOXRgFhUxNIV4dy86iJseZ+o+PYX7nEXJE3j6NIC/iv22VRpPCiI80UiPI7OVEN+fniT9WjUw+EJ48gTp8EPfNb6H8yX8Dv7kbd/8+5KtfJnA02skg9TIEIYQXp02OWo/WHA2lvzkHTyNdnJXNkHnX/dibbsCbmqL8Xz6H++wz2Du2Et7zVqwdNyC9XaiJSYQQidts9ekP44C3ayG0q7G8jwVKO3Qta4eWh3Y1vO42zml33Bo8xOULuWYh//n4dcMMtVwa7pL2SlbwudklIjsvd8OeuWPzGLNmvMTuz8Wu50sjDAxIZPc3AmEY2+4jK72J/9KA1MtIGNVCCes+cmECN5OJZ50Zn56ZYCpPanhSxdcNQSyxwI3yCBnVohYrQEfpnUNAAoOajrx+3J98N/LP/wX++g0oIB1YqDC6sgk9CIM5Ilca54dRYJnMTDqCaAWWhRFDBdD330/uHe9EA9NHfoj9tS/C8YN4o2NRvqNSL3r1AMayohFRCwy1CBLEU2W8G71MG76Xu7nZzLUoxOcQbywuhWeJNMfdLO6B0sqVCvJ2eOAy7qtBs3b7DHMnj4u0/zbavxxW8rl56NKHzNKyIhpn7gZ3YvfnCsw+omPtPhDwI48WA4iYKI0BjQ3UKmIi4W+5NlZXEUsMPlHOHROfl84XkDt3MlWvIK8eID82SQpnJiVzo81wZkKIEKUQN7qNAKBex6pWos1k10V+5qcJJ0bxf+/TyMgYBNPRfDE2jkxOzkxSxP0IQ4HY2ycyCSkEEwlwAUNALZPGev8HSG3ZEu1zrNoAn/gt/JPDhLfcTArQKZf6DYP4L+zFmSqjJIoXaNAIYFMCZs7ew1VllEgoNr++roi1xatpirpSdnN5gq5ZkDUEf8PufiUa7lPM+ry348K63HxURB65jI3nOeOilNorIuMs/6rodUtbwl8UumETUTCjqs6m428SzpNVjNcQ/incVX3UC0XYUCK1bTtqzVrCtX3UBjfjDG0gvfcZzJ/8Cc7oeKTvi46v0xDFcw0kohS+8QnKZWzAHxnFqvpRXIEJkc5OzC/+IkGlivfp30NXqzhAMD6N7Qdz0i9A5FHU2HuV2ACv47wQvtSpI5j3vYfMO96GOA7lwCBdfeiPfwzXD3BsjQZC20bdchvmiT3IVBnFAgJ+HmvP1TIAxQ//a+KfvwQejP3Xm5k3WOs64FGimAu4DCHXqt3GAq75kLY13GV2222XPUSricY9Xs7E2LoiarTXmBjf8Hb/9nP7SPMfMmO3v2iXdHQaYtdJ47roO+9C/do/x96wDvfWnViDG3ELearxqW7Khcc/j8U+jNJIvBUrjVArraHZhOI6qO3bUA98CF2po7ZsQ9ZvAMAKDQaN7luD/uVfoY5GHdqP8nzU1u3ozZta84liCImqdDUmHB1n5PTxHYvqxo24v/qrpNdvxJ8sU37iSeyTx0nftA3bTiNr+/GGNqJcF73jFlQ2F7c+N/n13LFMcjrMQ2s0LUQ/1utR+D9FJOAawvoBljYpX6T1X4ca7m5mPZI+HAeGLeV+5lsRPcPyrIquC9rz8w/DgEYKZV8gjDZ5Z7xumjdox8agXicE/EwaddePkr/rR7GYNbdYnkdQr+HXPbwDh1DT1RmzCASIxFZ/EYIgwIpt8gA6kyF977sI770PJ7Bxo4CAyKSibWwT7Um7/X04//qTM3mC0jStWuI4ghCoBx7Kq5AGEB+FEIomIEDcLLz9bux1gwRTU/jf/Bb6dz6J9dILaBuCwKH+cw9i/c7/QWHoBszWIUxnZzRmhEiT8J8ZH4nGL/JmasoUndB2aH0cwDavC6NSyxU/vew8xKyZ5RMishTXymbttnmlcN1ouHE8SmOzthF7sejEOI8HVGNsFt0PeaPRlvA3JjQqcvXEhAaCKFePKB2lXUZQWCgxUB1DglokY5WFE1/UAzwM6uQx5AcvUT92CPPifszXv4H96suxYKxFJhRmJ4ry+BhMT80kStMoXBXfhtO4ofj3bc04cKKA1Hw30yQKQiAwITr0o81lAIKZnEV2vU7mm98k/NSjTG/ejP2dpym98kNsoqpfBh/10g+w9j6PDN2A2bCRYOsN2M88gz0bRjb38iJg4nWTzG4yJ7yxiL2sWoXcpTTcheIcrjcN9xFmV4JLmRibx2VvY6VwHa6Kroj2NH+ldCPyljgfvgFCY1CqYe+PfOgD2yJc3YcLWAcP4e0/QvnFZ7H2PoM+eIhwbIJwYgK7PI1fj5IuaBRq3XqCfBrp7abeW8ItlHBSRay+1QTZTJOAXD5FzgXyd74Z+be/ixw/hql7qPEpzMQk/tQF1OkTpF85QPjHn4lKTgJ1oknCJgpgC149hP8Xn2faTuNv34hKKchm0JUqRmTGLbVpLCNT1sx4LtvtvGGJVwzRwm7pCeOuBXYTBZeViFYCjyx04Dza7Z4F/n7da7jxxLib2VQdH77EKc0rotbV43WzKrpS2ozwNUZm0mBGmmsUDKswKgqYskijxMf5wUvojz+MFghffpnw9FnMiaOEcZ5+tXYN3Hwj9sBGdHc3pm8Vet0AqrsH27UxuSyZXBonlcG2U6TSLqq3i9noAJjVlXXT6+b35ubmmU3m0CxtwyiV9Lo18MEPQKWK8QOk5hFU6+h6BTU1Tmr4DP6584Tj4wRTE/iT48jwadzhM6hjJwiHhzF//wXk+99D1qwmM3wax/cJicdGWdEkEF9VSZwij2XX+C8p8OYRjJvijcZr3usnFggreYmrrhHGEcONlBtDLJ5Tp1Wojy0wHnM03KWOW1PWUYg22pey0bqSz81jzGYIvVTG0uaxeTjO8TQf18OqqG3adPUMjGDAgPZC8L14M9aOTD9RrmcUAamXXoaXXiYAglIHav0Azo53Ea7uQ4Y2Ye3Yhj24Hr12A06pBOnUvLnvG4RALYRKJcAzUA9hygcvJC6bSFQMvhFoJo2tYqJViRKshjeSErQNOQeKlsGxFJatSadTFAqpGQu9xVyTkR33I0AIR88hw2cww2eQY8fh8EGsV17B7DuE/sHLUK1ELqiASB2XTDwBROak0Bi053EtEQuhdk695ieNy+DCpQ+5iCueMOJ8RA0ht5jWvlD06nxcFQ13JZ+buO1HiPz1F4xVWCTieT5e96uiK+HKirkIqFDAhLEuLegwIJA6HqCLBexSibBYJNh+E+pd92LvvA21YwdOOjujc7e6WwJ4oVAPI0EfhFAJQ877wtkpi/NTcG5KMe0JU77ibFVR9sAX8H3wPEUgjSC0Wd1eKY3Wgq0UloBYgpMy9KSFNSmblKNxUkJvVtiQU3RkoJgVOh1D1lI4tsbV4NrgKIWFgq7V0LUa76Y3xb5BQL1K/bt7kWe/S/07TxMc2I9z7hzWhQv4QRVL3CgaOf4HY0AkLoEZ+f4vA80bgEsKvmlxL9zL7I9ooYCn1vevtj/4Uvp4OSkdmlnq+DV/tlz3v5SAtGbB9WCra2YsKBsab6uGu5Rxa+ZyzGYr9tzESeEeYvHvtNXePyfTajw5jMUv39B2/zb9/HUUfRtH16Kt6O+whlGawLLwO0qoD7wXef/7UO94J6liZ1w7d9ZG3tCsBUHEAwweNmcrmiMXhOMTisOTcKGsGJ62OTkF5QpMBzBZh8CP0i7bmqjKFgoVF99SzBThmu03KrJSzURbKcRojEQTRyiCsiHnKDochauFfFYzUNQMlgz9HYZ1eaG/BOsLilVpFVfsNTjKnknUYFIZMve8Be55C7Vfh/rxY3iPfwH7c5+j9v3nccOAvDG4gE+cm4gmc//y2P2bbZ2lBfLGNP+IWgOh9jR9vpCWOce2+hr8iJr7eB/ze4Fcjobc2naD0nzpBebRMhdKknZZKKU+LyJ7WEAzvYS9v0HzBnBrO0sZt+Y00Zczqa30c9Ps+nnJtls/jFcQzRPUG9bu357w970AS4wRkGoZpkfxjeADwU1bUP/sI6R2vZtUby+6kEelM03yLIwDnho+PDZn6oqXz9jsH1G8OqY4MK44PS5MVaEeWZBwgJQGrYWcgnw2am3Gcj9TB3FOIs65/Y7NPa1L08g8xMy5oYkmgloAlXE4MQrfRuHaCteGUg76cjBQEDaWNDd2awZ7NOs7AtKYOItPVAoyDaQG1iMf+WcEH/pg5Mn0539B7XN/jRFDWKmQmp4EE9UpaKR0vlLlP37Im/OZPCIirfnoP9F0yudamvgss5rjAyLycEte9geaPodFNidXkOY+7oqDo2bswXHu+IXsvYsyz/j9acv4NWoENNizzFWfml0/W5nXm6WF5r60arit49b63T7M3NQIl3NfK/rctLh+zsdSMr22TlCJ8F8q4tc9pcRIHQIvwKzpZ2zLGtyf+Emsd7wNZ8cO0h1dM7n648QJNETapK85MK44MKo4OKp4+bzi8KhivKzww3h1YBRKSZQC2gJXC66OFhqWirX6OUJe5vlrfhZSrJv3sBuC2BhBhxCYyIRU8xRn6nB2XPgBCkdrutKwqkPoL2m2dAk7umBbd8jGIlhIdAPFIk6xiD04iD+4Ce/976fy5BMEZ86hVTRSophJAbEcyr9S6qFYyDcKjjy3gE12vpzujXz1DfqFobcAACAASURBVAH3SGxKmI/dSxB8Ty1w7YWqOS10/EzVsbiPDzGbt2W+zb1GKcd2JqfdzNreFxu/vVxm7plL0eL62cqi2m18/oIabtz2fcxq0It9tw9ejma+As/NfDS7fs6wxBURLL4qauZyn9nXFW16+wjigUyBbNmG+sQnSXWtIXXPO7Ede6YAe+TNH+0GjHiKo2OKwxOa505rXhmB4XHFaBnKnuCb6Jy8A4WU4NqRoG+65IxQF4l9fdpUj5dymt2IMrMg0yhCEF88CKON5qoPE3UYKcPBMYVlK/KuYk1B2NwFN/cJWzoN/UVhIG+xKgMOGmfbDaS23YC64w6CI0fRW7ZE1zLCctl8Giil7os14Ae5+EFftFZrbH7YROQaN98P+NH4/Ncsd05sB34W+Gku1vIfY9Zzpp22x4G2x28ZaHb9bGYpOfMhSmrXbN6Z0XBjDXpFvtuVfm5aXD+baXYBXWhFBHNNnDsvs1jNdUNbkmbTr/ztVyY3v+Xuj7y1J/2x26FTMZO5xprZYTWUA8NIRTg8pXl62OLpY4oDFxSnJ4W6D1mt6ExBMS2k7ag3ocw1wyzHzTWnZF4u58DG5qyOs3CaUFELYLwK4140HqWM0Fc0rO+C2/oUP9JnGCyGlFIWPTk7mmAgTi5X54ljNr/3fYunnz5wvPSDz/zhqSf+4PeXqbsJCQkJc2hX8zcoMVqDrgukFRLb8gMizXiirvnvJxyeOiQ8cwqOjmoCH1ZlYCgHjgPMuGNGG67L7ejeCMRqzsu/XHp1YyViZh32STnQ7yrWEBWbL3uKc2MW+8/BnkOwOq/Y1GFxZx/cuzHgltWGvGNFKSmspo4mgV4JCQkrTHs2/yYpGgqAj00Ng8v3xy32HNJ8+4jihTNQq2lyjrCxKDNmHK2ahOZyI5H3T4BivBr5/xfSoB3wfChYgtVUi2a5MU1LlowjpB3oJdovqPuKV0/DC6eFL+yz2dwjvH0QHtgMQyULZUXLiWVy9UxISEhYkLbTOzS01IwVAIanz6b5hwOarx/RnBwDCRW2ho60kLLAtSLFNsr5v4x3MKdfUXmY6TpMhtCV8bAtxbnxAGqK7mKaMU+RUZGvvq1AGZkTK7zc/Wm4naKiIDOtFb6BwBO+vR8OnIbOjGJDMfYPSnL7JCQkXAXaNPuEgRihlIa0LTx/TvNbexxePQdVT0hbUEpFGreK7fhmpVRtYmuJgASKSQMXfFidr/GrO+usysCzR6fwy2X6Cxm+Nt7J986lqJah5FgUUxYpG4IVWoo0b1TbFriWRG6pIoxNw8i0YqoSDc4CzksJCQkJy057WT1DPwiNkE+B0op9IxZffRV687C5E5xYmIaNVDorjUDVV4x5UWbN7Z3TfPiGCv/kRgfb1by936I67uOPnsUNjqL9fsoVmJIiY3oVlrk6RnaReGM8Nk1lM4qcA6vcEK0MZll3JRISrozYdbLZpfJ6LabzhqQ9m78RQ5zNGRQ9rmJ9J+RTUYRSPbhEA8tFnL4hNJErvZMJGUyN8b9uu8ADt7rUxCYoW3R0dpPPdrBvdJK1tZf4+HZNyQl58swUf3Yqw3ilSIcb1xy+Kh2PrmJMvEfQKCwwk9CfZA5IuBb4MLPulEstopLwOqE9s49SWsnspq2oqEC5udr2agP1QIENdw0GvKdvjK25Kqu7SpAqENYE3xhcI4TKQrIlUsWN3LBhG8X0BOerJ/ji0eOcDG6i4Cj0a7LTquJ0EyouUpmQcM3QCFz7/PUQ1JQwl/Zt/iJRDRKZm0j5aqEU+EGU+G1Vh/CLN1W5s9cm9Ap4gRB6NXLaxU9nCALD8OkznD1zjnwuh5vLorMlNvbDbcfLPFcNMaKRphQRCQlvZOJqaDuJIqQ/8hp3J2EFWChz8qKIMQbVVLa3EfF0lbE0aCVUq4pXR11Cp0RWh5zc/32+/b1nwU3jpFzOnBnm6JFj5PM5elb1cPjwEXwPunpXU8paVCoToGTBnEAJCW9AGlr/ZaV3SHj90GZK50hKyuyfVx2RSPjbGiarwtcO+/zk5jpOvcKXD9jsOWTzDAH3rx1h4vg+JFQMbtiOa1s89/z3KRZy5LI2JWuSjTaILhIqjU4U/4QElFKLFZJJuA5oS/NXkTN6k5x8bSRmNPkobNdQ0OME1WH2jrr8ffkevjR1D5/84ih/99Vn8ctj9HYVMcYQ1j1Wr+pldOwCZ04dYW16grf0VQiM4IXXzz6riAzJ4hwSkYfj5X075zdYKLvipfo31tTGoknXROSzl+jDczJPtaZ57uGSxTuWcm9xuw+33MOC/VigjYdbzl1KXn1E5KMi8vg8Y/DIQvfXcq0Fc/PHbc831k8tdl9N51yq7UXHNeHq0pbwN2EQoMVYGkAItYBSM04rV4/omq5SFAqdfP1EP3/9SolqCu6/y/A/7nTYvrZI/7r1GGXzg5de5KVDB9m0bj19xa4obXO+xGR+AAILZbh+pP+lGSLy5HhKopJ9Vw0R2cncZGVXWlFpJ1H2yEMSZTFdMWLBdYjZerLz9eO5JQjz1lz3i46BiJRE5DmiDKUPzHPIw0Tf5WUL1rjtp+K25zt/F7P3tdj4DiWC/fVDezb/KLcPthU1YYirZi1v3y7dD4SsLWSU5slXMvzKFzIcHa3wB/eM8NiP1/ite9O86+13sHH7rWwZ2sTavn6G/YD9YUDf0Fp6+tbzjZMlHj/cg9aajMX1vN97n2qCKEtlw5b70SVorHPOb+KxNvpyR8vrnUvVfInST8+BKHsnRBPaik1kseBrbn93Sz8aWTN3An96ieZaq1FdqujMI03n7AVub7rufcx+l5+NJ9fL4RFmJ5/Wtjcxmxp5J5euMHap+roJ1wjtmX2aM6U1v3+lvWmTwMCFumZonfDgHYq7B20G8g59XRmymSyWnSZT7GDT0BBv3raNb5w/y57jp7gwPcbW0hT33mDIOpH30IrlHLrGiMv+/bumtz6x0LErwKZ53rsS7b9Z4OxaQe2/OWf/fDUQmifUBxbqRzzRtX624P3LxcFWu5vTIcc58Zu/yyXXFpin7Y+0tH2YuYrCzoXMSzFDEhVsSbjGaUv4I8ZgMDU/KnbiWheXTLxahAJ1gUIGfvaGEd7acYbxkVFGzo4yfHqUU2fOce7cGSYnJ8lkM2zq76MU2vzVXp9vHle8Y8DwwQ0jCCHVcOXyDl2jXFSq8Cpddz7h0W65xUbe/eZ87Ct1H839XqiU4LMLHL9QOw0WW/3MOX6BAijNOeovZyJtzoE/Pl+O/XnG975LtLmshW0SVoY2/fxNIEQ+9r4JSVlRnrerLTdnC7NH1b0Kk+cY2XeM83aWMN2F0UI6kyHlumAMmXQa23XZ1d3PX31P83fjIR2FKY5cCKmHgrZA6zeUr3+rC98dXFzLd1mRi6stNbhSu/9hZrXpJRWsb4Pmfi/k/tgsJBcS5gtNdAvVk21eJSxUdKT5/ctZ+TT3cXSR45o/u1T7u2T+mtEJ1xBt2vxn3TzVTGqC5ezWEvtBXFRFgRfA2aqmbmwymRSpfA7XtrGVJp/LU+zowNYKjMG2DV0pwzdO5fnYd9fyNwcGsMUm5wjqDZRP+TWqXtQs5D/PXHPCUu3+87FSAv9KmM+8BXPHoHnPpO3VTyuXYfrqbqP5pXxPifZ/jdNmeof4vwJK9Mzfr4XCrABCmKwYUhsGueGWQUpOmnpoUa9VsRxNKpUmDA1h5Ty2nOeZEzkOl9eQcTWrUlG/LS1vNJPPa0WzgGuUIGzYiBfSfBdlHhv6swsd2y7LtY/QsvIZZ66HzUKrn4UmkeXgSibcxXhA3qDlEV8vtBnkxaywV8sb4atg1oTUyB10iXNsDXlb8cSRPJZr+OmhOgMdVVK+piwO2rKgNsmBY8N8+3TI4ye7GPMd1hbA1SBL3OVt9K3BcpWbfIPRLOAaZoGG8L+TNoQ/c90u97yWNYWJ9gIa/u7zCb4596+U2isi40T93ykipTYjakeZu/G9mAnnarGbZAVwzdK+8KdRx9aAWFfUCSGyP2kFtVDhmaiwiW2B0kIcTrDgJGBp6MzA4TMWj40aXjpueP+mkHvW2eQzQlCvgldhWuf40mgnXz9Xote1GSiAQQiJiswsNH81NrODUFELQRQEIaQ05FyZW87x+uXBeTaELyvFb6vWGwu+5kOWYvcfanJLva/lnMO8xsIm9qJajPlWPnu4wtVP/D1cC8nXHiWKOYDIhfiRRPu/Nmlf+CuapKVckdlHASGKugHPCKGEhGjE1yCQsSEVVwKbX9MWbA29KTg04fDnIw6vTtTZ0uOzI1dhfHQaE4Ss6u7i7g0uw4HNsVHFmSrkHYWrZdGFSyjRhFSPXUEtLWg7xEcz5WscDU7cxnU8B8wXvNNss18KF2n9bWi+jeC0Vnbz+sg3P9/K5xmufPVzrfAU0QTfuM8HuDYmpYQW2kzvgFGCMQYEjdKxOaQN04+KO+GHwmhN6MlUeNPqcQZ6puhM1UiJR803VAIVqdwLEAi4DpSy0FsQBtMhVnmMsfMjjIxNcH7CoyMs8yuDx/gXd06wfV3AmIRcqBt8ier6trYerWwUZU+YDg35XMCtPXXuWDXNvVvGGVo9zYQXMunJzPHXMfMFeV2uRtes9Taf2+wVcint/6Igr5hHr3XBP4+nU2MMLuf+Xw80r74+cYUb+QkrRJvFXIyHEmMEjGgsR7Atg/hqTnH3pWCUIhRB+1X6pMYH1te59waPchDgTylO1HP88Qs5XjibYVPBIptWGBN5FzVr2jYwWYUx4J1bPH77lgk2WR7Dvk2gBVtBRWXId6/hg32KfjnHF6jw3HiOiaCLUFyUUlHeIqIVRqP05KRXZ3tvnV++1XBXR5Vxv0x3p83eEYc/86ocG8vjhzl0nGU0YUGaBdszLX9fL5rvYjTf/97GZLWMdv9rAqXUYRF5jGi12Agie93ez/VKe2UcA88I5opSOoiARlENIdTCj6w5zwd7TvPmoR5yuRKmPk2226Xuptm6Br58sM63jlkcnUyhQsW0H1XwcqxISNcDmArh53b6PHxXwLZCHhUU6cPGiGAphbYcvNAwcvIY23IBH3+HzcGJkP+01/CFfeBoyNoK24ZiKopjWJ2u8rHbq7xnu2JDp0tGCZ3jIcYo3tJRZ+CWMb52boK/ODrIdMUlqxWWlXgOtTKP1rtngb+vB813IZpXPq0+8Fds97/G2E0UQFYiWgksmrwv4erTltnHypZqEtpGfKLSg02SbkkyT2bNRPVAUNR5+xbFu2/M06XqVMs+xeIq3EwXBcvirjUV7t88TWAZKnVwHOjKQ3cBilnIZ8FYsLXH50ObfbaXLJSVh1SOdCpFNp1Ga834+CjHjx+hUlcUO1exrquHu9alGewW3DSkU9CZFwqx+2cQQCUUtvV7bFtVJqPqiJ0nXehlZDJk8sIUN3Yr3rXdoeRM4QUBgbnUzV87XOXleKtQn8mICTzX9P6V+vuvCEs1cbVkxWzNM9Q8BnOyejI3WVurv/+C2TKbrtuawXSprqkropHHK5dGyokhohQRCdcQbWn+2XW3BON+3piKRJ4wrT6QS0DHwVlGotzQ/flu3K5u9r3wIuWwzup1/YiB46fPc8ar8q1zWcarDpM1+NH1AXcPRsXPPc8QiOHClGFbd8idfTaIS2iEMPSp1+uIQKVaZWx0BM+r09e/AZwi9brPZDXktjU+H0s5OJZFwRVOTxr+v30wPunguCn2nErjh+MMZcvcvL4LKwWT01NMjoxS6t5EV6GLvFRREmKU3RwGca3TGhi1ku6BlxPAdD1ovnNYJLJ5Pq7m6udCG+csacJQSj0qIg8RCf/reUX3uqQt4Z/q26plzNHUo43Shq+/NLx+ljAPhEYhCgwKLQ5BTSGWUFfCyPg40+Uy+VyWYc/nj/ZavHQhRxDYiCW8Y6DKL90SknatKLmPVwOvDtks2C513+DValTK01TrVWzHARTZTJbOjhLa+ExPjOIbwRBy7yrF+7daQAYIODkxxbFxj5PTvRgcvrgvz9FzAb90c8jNSqjV6lTL06Rdi1w2R823SNsuaI0vcUH5lj2Ja5RWDXslXfKaf/wPtrpESpTTv+EieK3a/fcyK8CXsjpp1thb7f23Nx8YTw5j8ctWu3/z97KkSObL2IxfatvNn13Oc7KbS2cCTXgNaMvsE0xPoAixbB25/hDZ3Zfi8KOItP5qAGfKMF03dLs11hamUdhsHNxOqaPIiy+8iFTL/MhgkZ+8AVxV40QF3r2lzD3rKjA5zvT5SUbHKgyfLzM84TE2ETA+UaZSmcYL6lTrNcLQYGmLlOuiLYtKrUbFqyEabFtDYKiUQ6arAfVaSHXSoyec4l/dOsovv7nCuZowMa24uz/FWwdTUJ/g+e89ixcEDGzdjpXvppgL6euuEKiQkSpM+go/VNHqpp0BvnrM8ZFfqeCoS9j7GzRvAF+rWmJzvxdKbtacrrpZSC5m72+YSRZKztaagG/exHBNf1/O93jJ5H7zfH8LJbW7iHiST3L8XIO0l9WTOLAJEImCsHT83mKaror/Peop1pR87t9Q5qbuMmf9OtP+GH7okS92MLhhPRifp7/9dZ74x+/x9wfLPDeeo5Ay3Lf+PCV9nqpvmKqB5wuZfJFiZy9OKotl2aRTKfK5PN09PXR1dWHbNlopCoUCpVKJUkeJdDpNJp2mUMiTyuUwgaJeqVCpTHF0TLN/vJubO0IG0nCmavHUyTG++vzTfO8b3yEI6gwNbaCnuxtUQLkyztnxOj065Cc21XnHpimM9vEChRF1TU4A8Y+8OY3zSm7Izevl0kKzgLgm7f7MzeW/q7UGQvy6OXXDQhvZzRNdM83Hz0wW8Xg15wB6pFlIx/b95u/ycwvdQCvztP2nLW2XmKu572kjYVsS5XsN0pbZp5F+oRKCL0LWDnEsizo6itZVF3u7RIFckUmk5Bq25its6vRxUi71CzbfO1Jnx+o6vXmX3t5eHEsxff40BJqbe3s54yvWpMfYtd4lF5QxlovYLpYFuUIRx7YxxkReRFqhtcZ1U4RhwMTUJEpp8vl85M6pFM2RpZ7vMzkxDgi2hEx5ijN+mrs3ZvjxTWX6e+Bt61NsXr2ejppNvqeTzp4elNLUPcOLR0POVC02rPbY0ROiTcBUj+K5YZuMrUjb10QaiKdk4U7sXkJRloXOf2gJ5y6q9UIkhESk2ayyEnb/he5hd2tu/vmIXRjvY1bzfUQWLkE5U/h8iSsfWGT1o5R6KBbyu+K2nlvgXi6qM7AEdjNrl1+s7b20IchbXD8TrhHajPCNXFoCiWz2rjJL8m8PDHghbCsGpENDtaZYW7SwbcU3T6b5wFSF3rxLaFxKHT0U8kV6lGJz4HLPUA0T+mwopjl9toASjbZClLbQsUC3rLlpJpQCy7IwSqG1wrbnv10VBHh+DctOkdJpUqpM0R6lO7uan79VeEAUW7u66HZX49cClK3xAkPKDqhUavzjCUBlubHXIKFmeNphfcnw3VPgvvZCfzF2c3Vy4TR7siyk9UKUkK0hJO/jGrT7K6X2iMgmonuaT/A/CnyuZUybc+YvtPKBueaana2J0ZRS98VlEh/kYtPY3vi6lx1NG/dnRdpuotn1M+EaoL0gL8GgxGhASWTakCWkd1AolIpSIYz4Kayyx43ZCj0dmq8c6eDAmREGslUqQY5a1VA2Ad2FFKWU5i390Ybs3sNVDl0ocHNPnd50DS9IE4bhjGAXkdlKYxCvBiQyUXGxDV7i7GzastBi41g2oiyOjdX42oEx3ruthONogqrH1ESFkdExjCiclE1/1ufUBZ9nphx6sxZbdY1jFTjq5RlIBdjzXO9qEQuNti9/pee3tLWkrJRKqYeYR7Nc6P0ltHfZ96DUpd3W4nYfZYlpC+KV0SXLXS6lv0ttq+WcJfW1nbbj8y75/cQTTOfltp2wcrRn9okSOuhI3gtKRQFbiz21AthK0Fqxb0qzvl/Tm6nRJ6MMB8L52ha+ePAU69Rp1nYUmAoylMs+50/WCPw6N23pZCrVy6e/rTBOge190JWtcbosczT+1t+uApTW0eqguT/xJKEUaKVAOQS+Ty5bY4Is/9fBNegfnKHHGWZzqs6JCwYcwVUajKZgw5nxKb57zuLZ8mbev9EjLWMUpEh/ukjN0zNRyAkJCQnXGm0ndlMSeVkaFLZS2BpEyaLKv44Lv5wu2wx4Nexuh3N2F4dHfQLfIlNYS09Phu6ig0UXFoYTJ09gxsf5yks+f3k2y3cmBvjlG8t0qgrVSogxJkoyFNOwVTYmAaU1lmWhdbQfYcIQ3/NwXHd20ognAaVDqr5hfTHgwzfW+fMX+/jVPUf4ubUXePd6i3yhn86uXgRFODWOo216VBFnuMhYpcyR9Cp0yiGshPzwnEveUmgtb4SMnwkJCa8z2vT2mT05akBiobu4s2ej+peFYrpiUfUMx8oOXzvVg22B1EPOnzvPiZPHGRmdoFAssHFggKEdGxnPreWJUx1kHIsHNk1TVGUuVMB1nTnafmNDd+41o4iyRu+q1SqVSmV20hAhNILtuHiSYiDv8U9vnuKW9YofXOhnPD3Exs1rWNvbTalUwvc9hk8Pc+TYcabLoxQLiu8cz/PMSJGK0vhhyPFRC9sSrCvLdp2QkJCwIlxRPv+GmX+RZJvzknNhsqKpVz0EzaEJlwlP8KhjuQq/XufMxEkKGYuOQpFMYZC7tsH/UvXosEbpy1Sx7ALZdI5MxpnR9oMgwBgzo9GLCFbs5olEq5IwDPGDgEq1ikKRL+RRSqOjygSIgsmaYcKrcs/qcfrvzvP+m9aT7wjxqnXGxsYZPj2MCQyFbBalfCaDKQ6d7WRLRxXLCfF8h1oQtZWYfRISEq5F2hb+oiAg+sdSOta2L23fUERFWuqBwQ8VrquxbVjv1tmxIc3GTVtwq2Umjp7l0NEjrOrqZP3a1dzc7fBbO6f4yvEK3zlj89bN3XRnUoShwZgQ3/cpl8t4njfj+aOAXC4/c+EwDKmWK4gIda9OtV4ll8+htYVrWXihj5s2HBhR/NeXNYV0jd+8vU5/V4Ggqjh37jzDZ0cIVcim9YOs6i8yPV1h23CFY1YHXTmfnCMEoRWZwRJzT0JCwjVKe94+mkiYmjiVAXrW1LIEgack8vypkqYsmlI25Nduq/GzO7Lk3DQm08mApDn06j4mR85ywoyRy2f57rks/+GFAneuy/Km9R7dqSr1eopMJs2FCxfwPA/P86jVaiilyGYyhKFBXItUOkW9Xmd0dBS0xhhDGIYEQYDSGgWk7DTZrI+TMrw8luOFM1DqmODt06exxivUpqeoCgysWUPHql6wXG4rZvjU7ZOcHq5jjMb3hZQdEtUiS0hISLg2aX/Dl4YpXTXF9l7ayCFE8QEFxyIQjUWdO/tDPrTdIe86+EQlEjuyBW570w0cGw/5rwcm+Oaw5vBED6dGC/zkkNBpRqmOTjERFMhk0pRKJUZGRrBtm2w2i+/7OK6L6zoEsTdSeXqal199FRR4nkdfXx/ZTJZisUgoQrGQA9sil5lmIBfwpF/iU8+k+c/pcW7MpvjQ1lXsuimDVmmwor46ymKwM83/cGON7w7bnKhauG6S0jkhIeHapn2zj8z6yCti3/pF6uw2UIAFnKlpROq8e3CCVcUi3ZkOBAsN2AiWqSO1Mf7+RI4//mE/o1M2vdkUjq2xLR8lJvLcCXxEDLZtMzU1xcTEBKVSCcuyGDk/wtatW/AVhCKkUmlyuRy1ehWtFdlslkwmQ2gMltaEJoSwhvaquHaanKNRgcu+kS6eNx6VdJkf3ThFZ9EFrTBx8EDaSbNro+HmLp8jUxZPHnMJE+GfkJBwDdO+8CeudGUMUc7MpWewdC0YqcKrYy4/blx29hnAQgQsBWJCpmt1pB6yo9Nwc0+K530XLVBIQyABIZB2U7jKxRhDtVojnU5Tr9dRcR4fS1uMT4wTujbZXJ5cNsPGDf9/e2ceXNd53ufn/c5yN+BiIQnuFAmKEkUt1maN43iRbTkeO2nSaa04ncbtNG6kdpL+0bFjt9NmppnpOIlrN5mMnUxsZ1onk9qRl8qOayeWZEu2rMWSSVESKZISIVIEISzEdi/udpbv7R/nXOASAkgApCySPs8MyIt7zvnOgpn3+867/N6raIUBVjWRkfA8gjBEbUy1WqVom2ioWCmSd5WCCE3PZXuvwy9ub0FsmZqZJV9QCrkCiGDVsHfAYVuhwcFRw+Exl578Wp9sRkZGxuvP2nr4pv79trFvO35WfFJR+vLw/GSJLx3q4/CoBWoYSVIv4zgijASvexPv39vLx98ccfNAyFhNiS2oTc7n5XL4ns/cXI1XXnmF/v5+tm3bllybKtu3bWNkZITT42PEWFzXoa+vl97eXjZt2kRPuQwkVcA2img1GmgQJjEAEWKF8Qb0F2P+7Y0Bv3tbkb7+AZoR1OsNYhuBEUQUoxHfHnK475jHZN3QX1jQQHojUNV7Ohp7LNsM5FzNRzq2nev4zvPcs8zxqqrLKkEuakJyrjGW43i6710d300vfbb5cb+63Dk79pnu2OecwncrvdeMjEuFC8rzb6t0xqnxX2kPd6vQn09O/uBxhz99Es5UZrEazI/ri8XzC0AXe/thX7lBGFliBZN2jJc0cFupVBgfH6dWq2GtpdlsMj4+zuz0DI16gyAIiK2dbx82MzNDtVoliuOz7sZ1XYzvI66Zv5eZADYVAq7rbQEGKwXKhSI530l6CQNhZHnyhOXTPynw9HiBjSUwekWleQ4uZyAvJVK1ybZuzpLyxB106tfct3hjemynDs2lKjOdkbEm1mz8RRYqfH1cPCFtzrIympGyowv6cj73H+/ncz/JMVFLjH9kY0abFV46M4lVS9E4lMTgpgL51lqIY2wYIiKUSiXy+TwHDx5keHiY3t5eUPjhoz8iCAK2DgzQnSthAc/3ia1N/PuLbsjP5ZFCHjVpD+16aQAAGJ9JREFUKlO6bJe03zAoY5WQl2ZmCI3Bz+WwGvPSZJM/+KHP2GyOwXKi4hlf6m1cVs8n3ugLIBGhW4pO7aDz9gNeZNiXE1q7fdHvl6rMdEbGmlj7yl+TFbxFcMRJjP/Z7XzPiU1P7rtgjGGiGhNFFogYawl/9myJ//h9w5l6gxljeSXyiazBKFirqFXiKCK2lq6uLq699lr27dvHjh07GBgYYNv2bey59hoGd++m5BfRIEiCyX5SFOY67rwYnAgYxyFWA6FFoni+PWWXB2MNw5nQAgH3HYz49//YxeOjDhARRTEnpgKGajGer5R9iK9MPYdBVf3g+Xd7w+lUDV2udeRyjVI6WUqMLlv9Z1wxrNH4d8gpzDt/VocjMNMCozHv2TrHh26I2djtEtuI+48J971YZrDfIR9HPHTE4aejHn2l1HPTXpGnlbtiDL29vWzdupXe3l5c16VcLnP11VezefNmrFpqzXpyXsdh48aNlMvljthFMpksyEDIfAB7QxHGag7fe9FjZMZy6/YaJyseX3za4fiZEN+LuGZDjnvfErFrXUS1xWXVxH2VXA5NOc678ufsSWE5iemljl1NH+KMjEuaC/b5L5jP1R9bi0DVckNfyNv3+IRW+OaRmC/sF+I4z0dvc8nlLA+PKMMVYSCfVhMYmTf8ip418VhriaIIVcXzPFzHIbYxQRTNxyX6+/splUoLB+lCRzIEVAxWEiG4og9qHZ54xePxU8rbd0W8bzf8YMjjM48LL0/HXL3e41+9yWFDSZlu6Xn0TS9r7tKlWwheMqQ6+ufz+w92fH7Nyl+Xb7Z+Sd97RsZqWKPxj9tte7GpoNv5VdCXuQAjWMen2irwfw9b/vBReGHcY3fZILHPaTdkoqtF7FncKPG/J8HeJDYQxVH6NpCu3klW9+1VvbVJD19vUSMXk2b0qCqignGd5LZaIWojIiOY9E59V2iqcmwmoh56bOnO4XguX3jW5X886jBRiQkCH6sCYpOm9lcul/Xqf5FhX87f33nM11iYTDK/f8YVwxqNf4TSbpCSrLxTxYcVowJhDKUcrO+NeOREjT94JMfRiRLX9Ds0IvjCIYfjM0IYK/VQqYeJuwi1qOOA6xBHlmazRRCGIIlRbxt2SH53PQ/XdZPrW6QASnoPbs7DqqJBiI1i4vabgMJ0AFYtBRvyo6GQB046bCjAQMHl/xwu8l++7zI+26JcCPA9Sxwvvtsrig9q0k7wUqYz1XKxq2Yl/v7FbqGVuJIyMi4r1mT81cbJSltAReYLvlbj+lErxFbZ3h1z5zZBQgc1DrkclFwIYuG5Mw5bogJ3r4Pb+xpUiWjFkCPEuC5+qZuuUhegVKpz1BtNmq2Aer1Bo9Gk1QqoNxuA4hiHMIpoNJsErYAgCGm1Amq1OvV6A8/1yfs5pJTH6fIpOhBZoRbFlN06d+1qcdden7GqYbIihBYG8uAa+PFUSLkY8u4tli0FYaLZ7l1wxXIpZP6ci87UzcUT1Wr9/Q+ysiByRsZlxVo7eSUpl2lDFx+dd3W0/ernmgjSwmBEBCuCeHDn1QH3jp/hb4/2MBnmKTlwvOJw8JTl7j0t3rIt4rP7A750oI+TVUssYFxDIecjno8JZ5menoLY4noujnHStFChGtcRYyh7BcQmaZhWk6is4zh4ngdqKXYVIO/jxg0qAUw24bp1NX7rlhnu2i2EUTc/GO7CkriEmrHlTf1zfOSWaQZ7SjzvKFhL84pM9uFTwMfTz/eo6h939pddAYOq+vHz77bqMYZE5Kxev4uawd+qqr0d7p1zrvwXuYVmRGS/np3Clq38M64I1ibvYAwGUJukXSZ9eZNNK7V7RqDbh5E5l68c8fjNa1psKUV0eZbRAPIeVALD/z7kUCgIN2yGXT3QlYMfnM7zruEGH9jTolBM1ILyRfDqTazn4ZVyGCJs1MJgqM+G1FoxpS5Lb3eeCE2uG4vrgJ/3kzaTPoDhuVGPAxMOeQf6C8Le9Q6VpvDlZx0eGylQ9BPvUS1QNnUpd25zGJr2eOS0w3Qg9OffuMre15EHSIxi2/h9kBX2sE0ZZOmG56thqTE+z9KN3h9kwYjf1bFP+01gJf7+ByEJIqvqDEltwOLJJCPjsmRtxj+tlJVU2A0RjKRr/pVIOgPGKOWcUK0L9x3MMzQizLQMTfXYkEv6/ZY9Yf9Eid9/2GFXr8Xis6tLeGm2yF8dsOQd5ZatITk7TRyGOJ6LX+qFXIEomCWMLL4nbCh1UzYx4sbEjuIYF1cFtSEax4RBE6/QTaUZ8PxYxN885/LSbI5dvXCmUeLPnswz04g5MGbwHaGnpGkxm2E87ObPD5U4U4t4fMRFjcu6HIRXZrrnvUBb6uE/q+pqmn0/KCLvXWqD6oo1UJcdYwkWu2q+tqi4ayX+/s43mwdJJjw4ezLJyLgsWZvxXxD1AUkbOWqa4LhCX7dFcB2lLFBtOXzreJFyDtbllIKjRAqOUQbLwlQrz9Pj0O0mshA7y/DoSJ6JHxf4wGCLqwqT1OMWvutT8ANEWzTqDWrNiHLJ5Z2DObZsshwdbfDcySaOcRBR1EZ4QKno01du8cy4w5df8Hhm3GdTQej2ldmW4aETBsRjQxGKbuLqQpSSB69WhM8+aTDis7XLsD4H0RWq5ywiQ6nBv4fEiN7DQibMpcZSQdrOVf1K/P1PLfrcNv5vJjP+GZc5azT+obUkOjtqLTiJ3o7Cyv0dmjQ2F6DgK1tdwRGdl41oD6Uo3T6UvMRVFCvkfdhiXEYr8IX9eXxnA66xiBhA03TQHsJYcFzLU7MxO3qV/SMFDpwSXJKJRUQxCCaNX8yELhEum4pCwVVCmwR0B9KSANdocs/pxVlNFEq3lw2q4DtKZK9Il08nnwB+ncT438uFu3JeF5by+3P2qn4l+f0PLvM58/tnXPasrZMXAdJh4kTsfAblag2fkqRvum7SAKXdFqa9UUkMcDuIrAoSQ86AdaEeGgKbnze6VtPU0zTdphXCd49ZjIE4FuI4uXKN04JekthFbG2i8e8JeQcgrQFA8Z10v0UZTUoyIRXc5NvVZjzNjyLpXXee4MJnkNUEY1dMalT/kMToDwJ3vx7nuUgs9vu3jfZK/P0A08t4pDK/f8Zlz9qMf+rzd+CsSWCttI36UphUM6hTLie2IEbJO1AwpJr6bQllmR/LpDPGVNPQjBKdnnLafMAxCz0JDKBq5t8GrCYTRdurNX99yzQruwykfFaal7+sdHMnIvIpVb03HfdSXgV3um0+xIK//++W2X81aZyZ3z/jsmZtRV7W2kRaITW2HVPAxU5vFxJjH8VJ+8fIJv8bSf6vhtCMldAmUg+KElklipUwVpqxsr6obC8rnqu04mSF7UiybxgrsSbHhB3FWY1YaaS/OyQB3Gb8OjVlX2rMC3+QT591iuULszrVK1ezkr3Uc/3hbFfNB5f5vpPOiezuxdKhnJ3dlOX7Z1zWrM34NycjtYFtKQTWpEJoiQW72LbR2mSV7vngueCmP9aCcSBfAuMKjpe6YQzkfMjnBOOCl0smiWYEubywZZ3Q150u4gXyvqAi5HJCzkvGtUC+IPj55IasBXFAXEhLHC7qJNd2mdlUFvtijJ26JPZ3fPWaFXo6ISzn4z7f+F9bzf5vBEs8A0hz9xfvex5/f5vON4lL+Y0nI+O8rK3CtzrWUhvYUCGIE+N/QQpx52CyBlv6lDt2KTdsg5t3KjdtV8brwmCf8jt3RNyxNeb6rYpxlC5fuWGLcN1W2NBv+aXrYlRhLhDuflPEx+4MuHG7ZbwOm7rgV6+DbWV439WWGzbB6FzydvHbtyn/+mYIFE5V4br18Gv7oKeQyFJE9uJNAJq+O9l0ogHBuN6aW2x20NmZ6487RdlSw9+5/cFVFm3B5afzs9TvbTqN+XIxgc5jM52fjMuaNdnsaOLEnMbNKATCiJWm96+JeiCUcrC1T9nUY9nSq2woK9UI+n3hlweV9+0L2bUxxjVCMxI2divv3W153y7Y0680I8V1lOsHlM0l0BCm60LesexZH7BrvWV92aIS04hgQ1G586qAW7eGGDe5hq0l5c0DMQXXEiPEF7xEX9D+bLuSlLQhThwSzY5fcKWAiHyepAgKEn/3A+0+gyT+/bbBG2INhjydLFaT63+hdLZpfE0bx2VYnNK5XIrnOTOBYGVvU+e5zks/OpTxc8PajP/U6cjVFk2FSmgxWEjz/C+2z18Bz1ECa5moK/WWknOgy8BEE+Zcyzt2tnjrphgDjMwKvijv3KV88HpLzihzLQFJgrmOKJLGEE5XkjP8yo0R1o148QxghY09UJMYJGQgbymlbqYohqmaodUiSRO9gJtNaiKUGAhUQBwqdaERgud5kbrFi5JJIiL3kmTkLBWcHAI+ISK717Dqb/MJLt1cf1j5yr8zJrDcBAFnx1JWWnCWkXHJsSbXQmN6dCZHGNUiGK+Du0Ep+ElqzcXOfBGBOFZcLD2eUHAgjhzKbhLsfWHKcEuv4U294ApJ4Fcto40kCBykrXsN0IqUkRrMhELRg+FZh9NV5devDTk0Bi+OO/gO7NwAkRgcidjVq7w0AdMtwRqhXIK5pNvkBd2rpKqo4kBvMdFFPTFrmJxRuk1Y194Noxfh8SXnSvzzq85MSSeOc74RpKvhvrUen+637DS60jHOc33nnaYXtYI8135LXs+FXmdGxs+aNa38W63qUE5b9UodRisG33XY2pcY/lZ0cRUtjQOTFaHfUT5wdcgNG2Mmq9ACNnjCzLjHN491MR74OCJsListIv7uUMifPCHMRdBbUDwEYsPJisN4Q+jJJav541OGuQgacw71FvSUkhhATh1Qh4EesCbpOralV/knN0VctTEmskIzWFsfAyGJGcQW1pfgxgFoxXBoFqZmA7oap0ZNPPPKxXuKGRkZGWezppV/effglEczmJqGkabgCOzrg/s1CYZeTOPfn4cXJx1enlbeOqiM1x2eOW0II4gcy4FJy8kph4kahKr4jnCm6pF3gZYwUknCqbUQRurCe6+B09PKyARUGsJwBb4yJBybcih5wpYey7FKzPceFcrk2NKllPPKcBUmWvC2HcrBV2OOjwpxZMj759MwfS2Ogam6EFu4tke5pifm4VPCsWnACeckHH+m8erhwxfvKWZkZGSczdoknU08VCzlT8xYbj86BqcaMW+/2tJ/wOXUpEkamK/eJi5JV04hgEeGDM9P+DQCod6E/qJyclYZmlVaTeX4mVS2QYTnTzu0W0uenBR8A04evrzf8O3D0GwJvgPbeuH0lPCXj7sQGjb3JMHdx44Z6gEYFV7KgS8QhcL/fNih23eYbSgFV5C0KnmlGElcU7GFFydhzyb48K0WI5ZvHfWZDqG7eWq0Nnzw0JmnHogu/OllZGRkLM2a3D4n/vZzzXhm4hjNM3MnavDoy8recsi7dkNL4eXJxDfvXKT8z6IH1abh0IjDqSnBc8H3oNEy1GoOaqHWWKgErgcw14RmALO1ZB7yHBifFZ4bFsZmk3FznhLHMD3jEAbJ72EM9brBjQ3EMFtP3mxcowxPC4deFapNwTPJmEbO/eOYdF8DUSycrsLTY8KODfDRtwbcuSPgoZMuDw4bIgH/1NOHJx//xiWdP5+RkXH5s+Zc8tbYoUPdfQPDs2b93u8ecfln18R8+IaIFyZcvvOCoTSTtGgsuInf/lwSDkvR9hxZksKtntyCNEMqJEreSBJoFqXkM19mVvAWZHJyLJy7Lw99uXSMdAXui9CfS1bwtWYaxJWkoredvVRrJfuX3ORtIrZQC5a74oT2RBQrxCqEVoliEEe4Y4fy726P+JfXR7w4KfzR4y4zBvoa1bnqy0/9qDY6NLzyJ5WRkZGxetZs/JsjT+zv27XnWIOb9v5k3OWBk8qv7G7ysbdZmupz4ITBqhL74DoLImrtCtn04zyv0TPTRdtSOYmz6RSXWxhTOlber6HdgSxOjLK1EKcj2XjRdWj7kLR+Wc7tzTrrfjqMvzXJW8WufsutWwy/fVvIvv6YY7MOf3rA5bFTcM32ED308PcaY4eyVX9GRsbrzpqN//AD9x3xyjsfLw78wq/Wi+v4zFOGvf0O79ocs/39MV88bHjkqDI0JdTmIG+g4CXHGklklE2HGbWAVUmapGiitKntPsGpkW5rq+kiCyySNH8Rk1hnX5Sim3QDM2bxZCMEkTJZF+qiFAqWXhFyjqHYr+RdxY8Td42dn3DSfzuLsV4zA+i87lv7eoqOUPJhcxl+YZvl7dss/QUQLE9OGD79E5eHjjsMrrfYV4bGp5687y/G93//mbX+TTIyMjJWygVJCMweffyHucGHf7j+3f/8Hc8fdvijJ/L8t3dEXN2t/N7NMf9ij/DT0Zhj48LxSeHVObBR8kYQaFIlawFRxTGKb8AgOAb8nOJ6yQq96Fr6Cpacq8TWIKkSp0mFEQJ1qARQaylBCNUAxmvCqzOJMd5YTCaDMy1htAHdObhuI9y2w7Jvc8RVOdiaV3qKgusIBps0e1lk4HV+3b+4nE3S7YlhT/YUjBhcA3lXKLgxEDFSF770XJ77XzCcbghbB6CIGR8/+tBHgslTj17I3yMjIyNjpVyQ8bdR65nmycN/VTy29+Z1G68v/8MJQxi4/NYtMe/cYVmXs9zYb5nY6TFeM8y2LBqHKBAqxOokA4nioLiSFD85BjxPcB2DquAbpeDFuMai6iRVuul7gFVDpEozMjTDRKVzLhJOVoWTU4YDI/DTUeHlimVb2fJrO+GdO4WbN0Ts7LdsTQusoAWqzLZyNGOPKFZyjmKk07ALkOj+d4gz0Bk3V5TYJNNEHBqmW8rYDJyoGF6adHlu0uHQjFAFCrUpdOSn/9Bav+lzYeXV74zvf+TKbP6YkZFxyXFBxn/myE/qXXve8+3GS0e2lQul/xAVd2767qhh5Anh6FTMmzfD9rKwsShsLELi3IlZvuCy06B2CugnBloTIQmaoWJVcI3gm6QDGGJfc0wtjjkwKvz9Sw4v1+C2jRHv3yHctMFNr8Py0ozPcN3l1aow1HAYq8HcLER1yOcWgssLUv4ORs7+fh5NXVLptjhIqoEnQxhvweQczFUbFJie6tWRZ2XkxaebldGvH//vv/TEhfwdMjIyMlbLRSvH2vfRb/3Xrh07P1TtvmrvSK3s5mL4xavg+gHLTRsMu3uVnpxNV+0L/X7bRjS2QhRJkrYZwnhLqcQQGUO9Dq1GEkANgWojScnMO0J3CQoFyHuWza5lYwFKeaHLVXrzIZ6BQHNMR8J6L8BJ3UQna8qPhuGhIZdjE8pINQqqzel6FIb1OOgKRPMgatqB3rMemYLKQgeDzilLSDqTgSZy1I6HY+vkopmg7ERz3QVvOJp84dnZY9/76vD9n878+xkZGW8IF1WHbfO7/81d3Xvu+v2e2+++o45xzzTEhFbo68Ks74Z1OaHLS5qjOALiKJKmb9abMDsrNmxCoMqcKI2cxTpqW7OG5rSBVFdfAZuWQHldlly/xQmNybcM5ZyYTT2wt09585aYd2239OWdtO+YpRnHPDQq/K9DDg8PqZ2bDqPexsxct9faHz7/9cMazB4tXPvW0fxV1wVxpZlPrhZem+Mzb+oRMeaszCNNH6sqprzBhBNPm+qhb43YMPfM8P2fvJRF0DIyMn5OuBia8fM4hd4fzj7/9Q+FlWN787vf8cu9Xs/bnMLAlni62H9mxu8aMz6apuqogtgY1QhVC9ZWHM+fEdcg0Yxl5kQlPnNypjk1Mp7bdNPoum23BI7ru3FUT2IEuYLROA6aQ4fc1mMHtnjbrhuMN9zYNWG6Bk5P+L1PdeX42ssu7xmET9xqGewKmWoInz7o8fenYfxUROHVg8+WK89+QcQ8KpveOo7xA8QEKhKpShrglXOUqknHz+LvE9rdzhATDd//yddUB2RkZGS8EVxU4z/8//4kAEb58TdGr/u9+495xvuyn8sVxx78bDGYGdpSuvFd/ZQ3G8SgzaoNx16ut155rhlUpoLc9tun8rf8Zt2s32ElDnCa1YDqZKBTo03Ts7PuS2Qd45iYEMTiGB+1kQ2DKjIz1mXWbe1CjG8njxaj0z/dFnrF24Leq9/9zbk79ll1uHWjcLImfPUYVI7sP6avPPaXjgkezRXyR458/ncqF/M5ZGRkZFzqXGz5/fOy92N/YTAORz51z+ua2XLVP/3dLf7AW26fKm58X37zvt/o2bylv1GtRNP7v/uVflv/ZjD22DeGv/PFLLsmIyPj55KfufH/WXPtRz6ZrzvbPjOXv/4DZubI4cLRv/7w8JP/OPVGX1dGRkbGG8kVb/wBBn/jP93eGB95S1ife+XME9/41ht9PRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGT/H/H9IjTf5Oim+CAAAAABJRU5ErkJggg==";

        // Agrega la imagen al PDF
        doc.addImage(img64, "JPEG", 15, 5, 70, 30);

        var title = "CONSTANCIA DE INSCRIPCIÓN";
        var titleX =
            (doc.internal.pageSize.getWidth() - 40) / 2 -
            doc.getTextWidth(title) / 2;
        // Agregar un título centrado en el cuadro azul
        doc.setFontSize(24);
        doc.setTextColor(0, 0, 0);
        doc.text(title, titleX, 60);

        // Define el tamaño de la fuente
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);

        // Dibuja la tabla
        const startY = 80;
        const columnWidth = doc.internal.pageSize.getWidth() / 3 - 20;
        for (let index = 0; index < columnsName.length; index++) {
            const y = startY + index * 10;
            doc.text(columnsName[index]?.label, 20, y); // Escribe la clave
            if (columnsName[index]?.key == "imagen") {
                doc.text(": ", 20 + columnWidth, y); // Escribe el valor
                doc.setTextColor(0, 123, 255);
                doc.text(
                    window.location.origin +
                        String(data[columnsName[index]?.key]),
                    20,
                    y + 10
                ); // Escribe el valor
            } else {
                doc.text(
                    ": " + String(data[columnsName[index]?.key]),
                    20 + columnWidth,
                    y
                ); // Escribe el valor
            }
        }

        // Define la URL de la imagen
        //var imageUrl = window.location.origin + data?.imagen;

        // Intenta obtener la imagen en base64 a través de una solicitud AJAX
        /* try {
            const img64 = await $.ajax({
                url:
                    window.location.origin +
                    "/api/inscripcion/format-image?url=" +
                    encodeURIComponent(imageUrl),
                type: "GET",
                processData: false,
                contentType: false,
            });

            // Si la solicitud tiene éxito, agrega la imagen al PDF
            doc.addImage(
                img64,
                "JPEG",
                20 + columnWidth,
                startY + data.length * 10,
                200,
                200
            );
        } catch (error) {
            // Si la solicitud falla, solo agrega el título al PDF
            doc.text(
                window.Location.origin + data?.imagen,
                20 + columnWidth,
                startY + data.length * 10
            );
        } */

        // Guarda el PDF
        doc.save("Constancia_de_inscripcion_" + data.id + ".pdf");
    }

    function autocompletar(inputId, array) {
        $("#" + inputId).on("keyup", function () {
            var input = $(this).val().toLowerCase();
            var suggestionBox = $("#suggestion-" + inputId);
            suggestionBox.empty();
            if (input.length > 0) {
                var suggestions = array.filter((item) =>
                    item.toLowerCase().includes(input)
                );
                suggestions.forEach((suggestion) => {
                    var li = $("<li>")
                        .text(suggestion)
                        .addClass("list-group-item")
                        .css("cursor", "pointer");
                    li.on("click", function () {
                        $("#" + inputId).val(suggestion);
                        suggestionBox.empty();
                    });
                    suggestionBox.append(li);
                });
            }
        });
    }

    // Uso de la función
    autocompletar("colegio", colegios);
    autocompletar("departamento", departamentos);
    autocompletar("provincia", provincias);
    autocompletar("distrito", distritos);

    function limitarLongitud(id, longitudMaxima) {
        $("#" + id).on("input", function () {
            if ($(this).val().length > longitudMaxima) {
                $(this).val($(this).val().slice(0, longitudMaxima));
            }
        });
    }

    // Uso de la función
    limitarLongitud("dni", 8);
    limitarLongitud("telefono", 9);
    limitarLongitud("dni_apoderado", 8);

    $("#nivel").change(function () {
        var nivel = $(this).val();
        var gradoSelect = $("#grado");

        gradoSelect.empty();
        gradoSelect.append($("<option>").text("Seleccione").val(""));

        var opciones = [];

        if (nivel === "INICIAL") {
            opciones = ["5 AÑOS"];
        } else if (nivel === "PRIMARIA") {
            opciones = [
                "1° GRADO",
                "2° GRADO",
                "3° GRADO",
                "4° GRADO",
                "5° GRADO",
                "6° GRADO",
            ];
        } else if (nivel === "SECUNDARIA") {
            opciones = ["1° AÑO", "2° AÑO", "3° AÑO", "4° AÑO", "5° AÑO"];
        }

        $.each(opciones, function (index, value) {
            gradoSelect.append($("<option>").text(value).val(value));
        });
    });

    $("#form-inscripcion").on("submit", function (event) {
        event.preventDefault();

        var camposVacios = $(this)
            .find("input")
            .filter(function () {
                return !this.value;
            });
        if (camposVacios.length) {
            swal("Error", "Por favor, completa todos los campos", "error");
            return;
        }

        $.ajax({
            url: $(this).attr("action"),
            type: "POST",
            data: new FormData(this),
            processData: false,
            contentType: false,
            success: function (response) {
                swal(
                    "Éxito",
                    response.name +
                        " se ha inscrito correctamente, recuerde presentar su constancia",
                    "success"
                );
                $("#form-inscripcion")[0].reset();
                exportPDF(response);
            },
            error: function (error) {
                swal(
                    "Error",
                    "Error: " + error?.responseJSON?.message,
                    "error"
                );
                $("#form-inscripcion")[0].reset();
            },
        });
    });

    $("#form-inscripcion-grupal").on("submit", function (event) {
        event.preventDefault();

        var camposVacios = $(this)
            .find("input")
            .filter(function () {
                return !this.value;
            });
        if (camposVacios.length) {
            swal("Error", "Por favor, completa todos los campos", "error");
            return;
        }
        var formData = new FormData(this);
        var jsonData = {};

        formData.forEach(function (value, key) {
            jsonData[key] = value;
        });

        // Verifica si el DNI ya existe en el array
        var dniExistente = preInscritosJson.some(function (el) {
            return el.dni === jsonData.dni;
        });

        if (dniExistente) {
            swal("Error", "El DNI ya existe", "error");
            return;
        }

        preInscritosJson.push(jsonData); // Agrega los datos del formulario en formato JSON al array
        preInscritosFormData.push(formData); // Agrega el objeto FormData al array

        // Agrega una nueva fila a la tabla
        var newRow = $("<tr>");
        newRow.append($("<td>").text(jsonData?.name));
        newRow.append($("<td>").text(jsonData?.dni));
        newRow.append($("<td>").text(jsonData?.nivel));
        newRow.append($("<td>").text(jsonData?.grado));
        newRow.append($("<td>").text(jsonData?.cod_pago));
        newRow.append($("<td>").text(jsonData?.fecha_pago));
        newRow.append($("<td>").text(jsonData?.imagen.name));
        var deleteButton = $("<button>")
            .addClass("btn btn-danger")
            .html('<i class="material-icons">remove</i>');
        newRow.append($("<td>").append(deleteButton));
        $("#lista-preinscritos").append(newRow);

        // Agrega un evento click al botón de eliminar
        deleteButton.on("click", function () {
            var index = newRow.index();
            preInscritosJson.splice(index, 1); // Elimina los datos del formulario en formato JSON del array
            preInscritosFormData.splice(index, 1); // Elimina el objeto FormData del array
            newRow.remove(); // Elimina la fila de la tabla
        });

        // Limpia los campos del formulario
        $("#box-estudiante").find("input, select").val("");
    });

    $("#btn-submit").on("click", function () {
        var todasLasSolicitudesExitosas = true;
        var numeroDeSolicitudesCompletadas = 0;

        preInscritosFormData.forEach(function (formData) {
            $.ajax({
                url: window.location.origin + "/api/inscripcion",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    exportPDF(response);
                    numeroDeSolicitudesCompletadas++;
                    if (
                        numeroDeSolicitudesCompletadas ===
                            preInscritosFormData.length &&
                        todasLasSolicitudesExitosas
                    ) {
                        $("#form-inscripcion-grupal")[0].reset();
                        preInscritosFormData.length = 0;
                        preInscritosJson.length = 0;
                        $("#lista-preinscritos").remove();
                        swal(
                            "Éxito",
                            "Todos los estudiantes se han inscrito correctamente",
                            "success"
                        );
                    }
                },
                error: function (error) {
                    swal("Error", error?.responseJSON?.message, "error");
                },
            });
        });
    });
});
