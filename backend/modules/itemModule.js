const { sql, poolPromise } = require("../db");

module.exports = {

  getAllItems: async () => {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM ItemMaster");
    return result.recordset;
  },

  insertItem: async (data) => {
    const pool = await poolPromise;
    const req = pool.request();

    Object.keys(data).forEach((key) => {
      req.input(key, data[key]);
    });

    const query = `
      INSERT INTO ItemMaster (
        MenuID, StatisticGroupId, ArticleNo, TypeSelection, TypeDesignation,
        SelectionCode, MasterId, Units, FF_HW, NetPrice, DateOfValidity,
        BasicPrice, Value, StoreLocation, OpeningQty, ReorderLevel,
        MinLevel, MaxLevel, CustReorder, Factor, HSNCode, CGST, SGST,
        IGST, Comments, SubstituteItem, ExciseHeadNo, QuotationFor,
        TransitDays, CustomDuty, ProductInFocus
      )
      VALUES (
        @MenuID, @StatisticGroupId, @ArticleNo, @TypeSelection, @TypeDesignation,
        @SelectionCode, @MasterId, @Units, @FF_HW, @NetPrice, @DateOfValidity,
        @BasicPrice, @Value, @StoreLocation, @OpeningQty, @ReorderLevel,
        @MinLevel, @MaxLevel, @CustReorder, @Factor, @HSNCode, @CGST, @SGST,
        @IGST, @Comments, @SubstituteItem, @ExciseHeadNo, @QuotationFor,
        @TransitDays, @CustomDuty, @ProductInFocus
      );
    `;

    await req.query(query);
  },

  updateItem: async (id, data) => {
    const pool = await poolPromise;
    const req = pool.request();

    Object.keys(data).forEach((key) => {
      req.input(key, data[key]);
    });

    req.input("ID", sql.Int, id);

    const query = `
      UPDATE ItemMaster SET
        StatisticGroupId=@StatisticGroupId,
        ArticleNo=@ArticleNo,
        TypeSelection=@TypeSelection,
        TypeDesignation=@TypeDesignation,
        SelectionCode=@SelectionCode,
        MasterId=@MasterId,
        Units=@Units,
        FF_HW=@FF_HW,
        NetPrice=@NetPrice,
        DateOfValidity=@DateOfValidity,
        BasicPrice=@BasicPrice,
        Value=@Value,
        StoreLocation=@StoreLocation,
        OpeningQty=@OpeningQty,
        ReorderLevel=@ReorderLevel,
        MinLevel=@MinLevel,
        MaxLevel=@MaxLevel,
        CustReorder=@CustReorder,
        Factor=@Factor,
        HSNCode=@HSNCode,
        CGST=@CGST,
        SGST=@SGST,
        IGST=@IGST,
        Comments=@Comments,
        SubstituteItem=@SubstituteItem,
        ExciseHeadNo=@ExciseHeadNo,
        QuotationFor=@QuotationFor,
        TransitDays=@TransitDays,
        CustomDuty=@CustomDuty,
        ProductInFocus=@ProductInFocus
      WHERE ID=@ID
    `;

    await req.query(query);
  },

  deleteItem: async (id) => {
    const pool = await poolPromise;
    await pool.request()
      .input("ID", sql.Int, id)
      .query("DELETE FROM ItemMaster WHERE ID=@ID");
  }
};
